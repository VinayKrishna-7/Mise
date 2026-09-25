const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { app, connectDB } = require('../server');

describe('MISE API Smoke & Integrity Tests', () => {
  let server;
  let baseUrl;

  before(async () => {
    await connectDB();
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api`;
        resolve();
      });
    });
  });

  after(() => {
    if (server) {
      server.close();
    }
  });

  it('GET /api/health should return running status', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.message, 'MISE API is running');
  });

  it('GET /api/recipes/stats should report 123 recipes, 72 quick meals, and 13 cuisines', async () => {
    const res = await fetch(`${baseUrl}/recipes/stats`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.data.totalRecipes, 123);
    assert.equal(body.data.quickMealsCount, 72);
    assert.equal(Object.keys(body.data.cuisineCounts).length, 13);
  });

  it('GET /api/recipes?limit=5 should return paginated list', async () => {
    const res = await fetch(`${baseUrl}/recipes?limit=5`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.data.length, 5);
    assert.equal(body.totalRecipes, 123);
    assert.equal(body.totalPages, 25);
  });

  it('GET /api/recipes with search should find matching dishes', async () => {
    const res = await fetch(`${baseUrl}/recipes?search=carbonara`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.length >= 1);
    assert.match(body.data[0].title, /carbonara/i);
  });

  it('GET /api/recipes with maxTime=30 should return exactly 72 quick meals', async () => {
    const res = await fetch(`${baseUrl}/recipes?maxTime=30&limit=100`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.totalRecipes, 72);
  });

  it('GET /api/recipes/suggestions?q=pasta should return suggestions', async () => {
    const res = await fetch(`${baseUrl}/recipes/suggestions?q=pasta`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data.recipes));
    assert.ok(body.data.recipes.length > 0);
  });

  it('DELETE on a foundation system recipe should be rejected with 403', async () => {
    // Fetch first recipe to get its ID
    const listRes = await fetch(`${baseUrl}/recipes?limit=1`);
    const listBody = await listRes.json();
    const systemRecipeId = listBody.data[0]._id;

    const delRes = await fetch(`${baseUrl}/recipes/${systemRecipeId}`, {
      method: 'DELETE'
    });
    assert.equal(delRes.status, 403);
    const delBody = await delRes.json();
    assert.equal(delBody.success, false);
    assert.equal(delBody.message, 'Foundation archive recipes cannot be deleted.');
  });

  it('POST rating with invalid score should be rejected with 400', async () => {
    const listRes = await fetch(`${baseUrl}/recipes?limit=1`);
    const listBody = await listRes.json();
    const recipeId = listBody.data[0]._id;

    const rateRes = await fetch(`${baseUrl}/recipes/${recipeId}/rating`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: 10 })
    });
    assert.equal(rateRes.status, 400);
    const rateBody = await rateRes.json();
    assert.equal(rateBody.success, false);
    assert.equal(rateBody.message, 'Rating must be an integer between 1 and 5');
  });
});
