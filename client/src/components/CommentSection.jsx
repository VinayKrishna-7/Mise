import React, { useState, useEffect } from 'react';
import { MessageSquare, User, Trash2, Send } from 'lucide-react';
import { getComments, addComment, deleteComment } from '../services/api';
import { formatDate } from '../utils/helpers';
import ConfirmModal from './ConfirmModal';
import LoadingSpinner from './LoadingSpinner';

const CommentSection = ({ recipeId, toast }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', text: '' });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const fetchComments = async () => {
    try {
      const res = await getComments(recipeId);
      setComments(res.data.data || []);
    } catch (err) {
      toast('Failed to load comments', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;

    setSubmitting(true);
    try {
      await addComment(recipeId, formData);
      toast('Note added to the journal');
      setFormData({ name: '', text: '' });
      fetchComments();
    } catch (err) {
      toast(err.message || 'Failed to post note', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(deleteModal.id);
      toast('Note deleted');
      fetchComments();
    } catch (err) {
      toast('Failed to delete note', 'error');
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  if (loading) return <LoadingSpinner text="Loading notes..." />;

  return (
    <div className="mt-16 pt-12 border-t border-border dark:border-border-dark">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-terracotta dark:text-terracotta-night">
            Notes
          </span>
          <h3 className="editorial-title text-2xl sm:text-3xl font-bold mt-1">
            Community Notes ({comments.length})
          </h3>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-card dark:bg-surface-dark-card border border-border dark:border-border-dark rounded p-6 sm:p-7 mb-10 space-y-4"
      >
        <h4 className="font-serif text-lg font-bold text-ink dark:text-ink-dark">
          Leave a Note
        </h4>
        <p className="text-xs text-ink-muted dark:text-ink-dark-muted -mt-2">
          Share substitutions, technique adjustments, or tasting observations.
        </p>

        <div className="pt-2 max-w-sm">
          <input
            type="text"
            placeholder="Your name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field"
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Add your note, substitutions, or cooking tips..."
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="input-field min-h-[110px] resize-y"
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary py-2 px-5 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <Send size={13} />
            <span>{submitting ? 'Posting...' : 'Post Note'}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-12 px-4 bg-surface-card dark:bg-surface-dark-card rounded border border-dashed border-border dark:border-border-dark">
          <MessageSquare className="w-8 h-8 text-ink-muted/50 dark:text-ink-dark-muted/50 mx-auto mb-2" />
          <h5 className="font-serif text-base font-bold text-ink dark:text-ink-dark">
            No notes yet
          </h5>
          <p className="text-xs text-ink-muted dark:text-ink-dark-muted mt-1 max-w-xs mx-auto">
            Be the first to record a note or tip for this recipe.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-5 sm:p-6 bg-surface-card dark:bg-surface-dark-card border border-border dark:border-border-dark rounded transition-all"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-border dark:border-border-dark bg-paper dark:bg-paper-dark text-terracotta dark:text-terracotta-night font-serif font-bold text-xs flex items-center justify-center">
                    {comment.name?.charAt(0)?.toUpperCase() || 'C'}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-ink dark:text-ink-dark">
                      {comment.name}
                    </h5>
                    <span className="text-[10px] font-mono text-ink-muted dark:text-ink-dark-muted">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setDeleteModal({ isOpen: true, id: comment._id })}
                  className="p-1 text-ink-muted hover:text-red-500 transition-colors rounded"
                  title="Delete note"
                  aria-label="Delete note"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-ink/90 dark:text-ink-dark/90 mt-3 leading-relaxed whitespace-pre-line pl-11">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Community Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmLabel="Delete Note"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null })}
      />
    </div>
  );
};

export default CommentSection;
