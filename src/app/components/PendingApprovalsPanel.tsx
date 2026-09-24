'use client';
import React, { useState } from 'react';
import { Clock, Wallet, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmModal from '@/Components/UI/ConfirmModal';

const pendingItems = [
  {
    id: 'approval-001',
    type: 'funding-release',
    startup: 'FinFlow Pvt Ltd',
    amount: '₹85L',
    stage: 'Stage 2 Disbursement',
    submittedBy: 'Arjun Mehta',
    daysAgo: 1,
    priority: 'high',
  },
  {
    id: 'approval-002',
    type: 'milestone-verification',
    startup: 'MedTrack Solutions',
    amount: null,
    stage: 'Milestone 3 Verification',
    submittedBy: 'Rohan Gupta',
    daysAgo: 2,
    priority: 'medium',
  },
  {
    id: 'approval-003',
    type: 'funding-release',
    startup: 'CropShield AI',
    amount: '₹35L',
    stage: 'Stage 1 Disbursement',
    submittedBy: 'Preethi Menon',
    daysAgo: 4,
    priority: 'high',
  },
  {
    id: 'approval-004',
    type: 'milestone-verification',
    startup: 'AgroSense Technologies',
    amount: null,
    stage: 'Q3 Submission Review',
    submittedBy: 'Kavitha Nair',
    daysAgo: 1,
    priority: 'low',
  },
  {
    id: 'approval-005',
    type: 'milestone-verification',
    startup: 'NudgeWell Health',
    amount: null,
    stage: 'Milestone 1 Verification',
    submittedBy: 'Sanjay Pillai',
    daysAgo: 3,
    priority: 'medium',
  },
];

export default function PendingApprovalsPanel() {
  const [items, setItems] = useState(pendingItems);
  const [confirmItem, setConfirmItem] = useState<(typeof pendingItems)[0] | null>(null);
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = (item: (typeof pendingItems)[0], action: 'approve' | 'reject') => {
    setConfirmItem(item);
    setConfirmAction(action);
  };

  const handleConfirm = async () => {
    if (!confirmItem || !confirmAction) return;
    setLoading(true);
    // BACKEND INTEGRATION: POST /api/approvals/:id/action { action: 'approve' | 'reject' }
    await new Promise((r) => setTimeout(r, 1200));
    setItems((prev) => prev.filter((i) => i.id !== confirmItem.id));
    toast.success(
      confirmAction === 'approve'
        ? `${confirmItem.type === 'funding-release' ? 'Funding release' : 'Milestone verification'} approved for ${confirmItem.startup}`
        : `${confirmItem.startup} request rejected and flagged for review`
    );
    setLoading(false);
    setConfirmItem(null);
    setConfirmAction(null);
  };

  return (
    <div className="card-base overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        <div>
          <h2 className="section-header">Pending Approvals</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{items.length} actions required</p>
        </div>
        {items.length > 0 && (
          <span className="w-6 h-6 bg-warning/20 border border-warning/30 text-warning text-xs font-bold rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-3">
            <CheckCircle2 size={24} className="text-accent" />
          </div>
          <p className="text-sm font-medium text-foreground">All caught up!</p>
          <p className="text-xs text-muted-foreground mt-1">No pending approvals at this time.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="p-4 hover:bg-surface/50 transition-colors group">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.type === 'funding-release'
                      ? 'bg-accent/15 border border-accent/20'
                      : 'bg-primary/15 border border-primary/20'
                  }`}
                >
                  {item.type === 'funding-release' ? (
                    <Wallet size={14} className="text-accent" />
                  ) : (
                    <CheckCircle2 size={14} className="text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.startup}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.stage}</p>
                  {item.amount && (
                    <p className="text-xs font-mono-nums text-accent font-semibold mt-1">
                      {item.amount}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-2xs px-1.5 py-0.5 rounded font-medium ${
                        item.priority === 'high'
                          ? 'bg-danger/15 text-danger'
                          : item.priority === 'medium'
                            ? 'bg-warning/15 text-warning'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {item.priority}
                    </span>
                    <span className="text-2xs text-muted-foreground flex items-center gap-1">
                      <Clock size={10} />
                      {item.daysAgo === 1 ? '1 day ago' : `${item.daysAgo} days ago`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => handleAction(item, 'approve')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-accent/15 border border-accent/20 text-accent text-xs font-medium hover:bg-accent/25 transition-colors active:scale-95"
                >
                  <CheckCircle2 size={12} />
                  {item.type === 'funding-release' ? 'Release Funding' : 'Approve'}
                </button>
                <button
                  onClick={() => handleAction(item, 'reject')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-danger/10 border border-danger/20 text-danger text-xs font-medium hover:bg-danger/20 transition-colors active:scale-95"
                >
                  <XCircle size={12} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!confirmItem}
        title={
          confirmAction === 'approve'
            ? confirmItem?.type === 'funding-release'
              ? `Release ${confirmItem?.amount} to ${confirmItem?.startup}?`
              : `Approve milestone for ${confirmItem?.startup}?`
            : `Reject request from ${confirmItem?.startup}?`
        }
        description={
          confirmAction === 'approve'
            ? confirmItem?.type === 'funding-release'
              ? `This will trigger a funding disbursement of ${confirmItem?.amount} for ${confirmItem?.stage}. This action will be logged in the audit trail and cannot be reversed.`
              : `This will mark the milestone as verified for ${confirmItem?.stage}. The startup will be notified and eligible for next stage funding.`
            : `This will reject the ${confirmItem?.stage} request and flag it for review. The startup founder will be notified with a reason request.`
        }
        confirmLabel={
          confirmAction === 'approve'
            ? confirmItem?.type === 'funding-release'
              ? 'Release Funding'
              : 'Approve Milestone'
            : 'Reject Request'
        }
        variant={confirmAction === 'approve' ? 'primary' : 'danger'}
        onConfirm={handleConfirm}
        onCancel={() => {
          setConfirmItem(null);
          setConfirmAction(null);
        }}
        loading={loading}
      />
    </div>
  );
}
