import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Trash2, BookOpen, Loader2, Sparkles } from 'lucide-react';
import { createRecipe, saveCreatorToken } from '../services/api';
import { CATEGORIES, CUISINES, DIFFICULTIES } from '../utils/constants';
import { useToastContext } from '../context/ToastContext';
import ImageUpload from '../components/ImageUpload';
import Breadcrumb from '../components/Breadcrumb';

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addToast } = useToastContext();
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['homecooked', 'fresh']);

  useEffect(() => {
    document.title = 'MISE — Add Recipe';
  }, []);

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      cuisine: '',
      difficulty: 'Medium',
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      ingredients: [
        { name: '', quantity: '' },
        { name: '', quantity: '' },
        { name: '', quantity: '' }
      ],
      instructions: [
        { description: '' },
        { description: '' }
      ]
    }
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient
  } = useFieldArray({ control, name: 'ingredients' });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction
  } = useFieldArray({ control, name: 'instructions' });

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#|,/g, '').toLowerCase();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const onSubmit = async (data) => {
    const validIngredients = data.ingredients.filter(
      (ing) => ing.name && ing.name.trim() && ing.quantity && ing.quantity.trim()
    );
    if (validIngredients.length === 0) {
      addToast('Please provide at least one complete ingredient (quantity + name)', 'error');
      return;
    }

    const validInstructions = data.instructions
      .filter((inst) => inst.description && inst.description.trim())
      .map((inst, idx) => ({ step: idx + 1, description: inst.description.trim() }));
    if (validInstructions.length === 0) {
      addToast('Please provide at least one instruction step', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title.trim());
      formData.append('description', data.description.trim());
      formData.append('category', data.category);
      formData.append('cuisine', data.cuisine);
      formData.append('difficulty', data.difficulty);
      formData.append('prepTime', Number(data.prepTime) || 0);
      formData.append('cookTime', Number(data.cookTime) || 0);
      formData.append('servings', Number(data.servings) || 1);
      formData.append('ingredients', JSON.stringify(validIngredients));
      formData.append('instructions', JSON.stringify(validInstructions));
      formData.append('tags', JSON.stringify(tags));

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await createRecipe(formData);
      if (res.data?.data?._id && res.data?.creatorToken) {
        saveCreatorToken(res.data.data._id, res.data.creatorToken);
      }
      addToast('Recipe created successfully!');
      navigate(`/recipes/${res.data.data._id}`);
    } catch (err) {
      addToast(err.message || 'Failed to create recipe', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Recipes', to: '/recipes' },
          { label: 'Add Recipe' }
        ]}
      />

      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/40 mb-3">
          <Sparkles size={13} className="text-orange-500" />
          <span>NEW RECIPE</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Add Recipe
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-normal leading-relaxed">
          Record ingredients, precise measurements, and step-by-step cooking techniques.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Upload & Sticky Tips */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Recipe Cover Photo
              </span>

              <ImageUpload
                onImageSelect={setImageFile}
                error={null}
              />
            </div>

            {/* Quick Tips */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                <BookOpen size={16} />
                <span>Culinary Tips</span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
                <li>List ingredients in the chronological order they are added.</li>
                <li>Specify units clearly (e.g., 2 tbsp, 500g, 1 medium onion).</li>
                <li>Include visual cues in steps (e.g., "until golden brown, 4-5 min").</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Form Sections */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Basic Information */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                1. General Information
              </h2>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Recipe Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Creamy Tuscan Garlic Chicken"
                  {...register('title', {
                    required: 'Title is required',
                    minLength: { value: 3, message: 'Minimum 3 characters' },
                    maxLength: { value: 100, message: 'Maximum 100 characters' }
                  })}
                  className={`input-field ${errors.title ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                />
                {errors.title && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  placeholder="Share a short story, flavor profile, or serving suggestions..."
                  rows={3}
                  {...register('description', { required: 'Description is required' })}
                  className={`input-field ${errors.description ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                />
                {errors.description && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.description.message}</p>
                )}
              </div>

              {/* Category, Cuisine, Difficulty Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('category', { required: 'Select a category' })}
                    className={`input-field text-xs py-2.5 ${errors.category ? 'border-rose-400' : ''}`}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Cuisine <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('cuisine', { required: 'Select a cuisine' })}
                    className={`input-field text-xs py-2.5 ${errors.cuisine ? 'border-rose-400' : ''}`}
                  >
                    <option value="">Select cuisine</option>
                    {CUISINES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.cuisine && (
                    <p className="text-xs text-rose-500 mt-1 font-medium">{errors.cuisine.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    {...register('difficulty')}
                    className="input-field text-xs py-2.5"
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Times & Servings */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                2. Cooking Time & Yield
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register('prepTime', { valueAsNumber: true })}
                    className="input-field text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Cook Time (min)
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register('cookTime', { valueAsNumber: true })}
                    className="input-field text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Servings
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register('servings', { valueAsNumber: true })}
                    className="input-field text-sm font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Ingredients */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  3. Ingredients
                </h2>
                <button
                  type="button"
                  onClick={() => appendIngredient({ name: '', quantity: '' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
                >
                  <Plus size={15} /> Add Ingredient
                </button>
              </div>

              <div className="space-y-3">
                {ingredientFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-3">
                    <div className="w-1/3">
                      <input
                        type="text"
                        placeholder="Qty (e.g. 2 tbsp)"
                        {...register(`ingredients.${index}.quantity`)}
                        className="input-field py-2 text-xs font-medium"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Ingredient name (e.g. Olive Oil)"
                        {...register(`ingredients.${index}.name`)}
                        className="input-field py-2 text-xs font-medium"
                      />
                    </div>
                    {ingredientFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Remove ingredient"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Instructions */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  4. Method & Steps
                </h2>
                <button
                  type="button"
                  onClick={() => appendInstruction({ description: '' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
                >
                  <Plus size={15} /> Add Step
                </button>
              </div>

              <div className="space-y-3.5">
                {instructionFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold font-display flex items-center justify-center shrink-0 text-sm mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <textarea
                        rows={2}
                        placeholder={`Describe step ${index + 1}...`}
                        {...register(`instructions.${index}.description`)}
                        className="input-field py-2.5 text-xs sm:text-sm font-normal"
                      />
                    </div>
                    {instructionFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 mt-0.5"
                        title="Remove step"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Tags */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                5. Tags & Keywords
              </h2>

              <div>
                <input
                  type="text"
                  placeholder="Type a tag and press Enter or comma (e.g. quick, dinner, gluten-free)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagAdd}
                  className="input-field text-xs py-2.5"
                />
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-slate-400 hover:text-rose-500 ml-1 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-3">
              <Link to="/recipes" className="btn-secondary py-3 px-6 text-sm font-semibold rounded-xl">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary py-3 px-8 text-sm font-bold rounded-xl inline-flex items-center gap-2 shadow-lg shadow-orange-500/25"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Publish Recipe</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
