'use client';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Upload,
  FileText,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FilePlus,
  TrendingUp,
  DollarSign,
  Users,
  BarChart2,
} from 'lucide-react';

interface SubmissionFormData {
  reportingPeriod: string;
  revenueActual: string;
  growthRate: string;
  customerCount: string;
  ebitdaMargin: string;
  notes: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'done' | 'error';
  progress: number;
}

export default function SubmissionForm() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubmissionFormData>();

  const handleFiles = (fileList: FileList) => {
    const allowed = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const newFiles: UploadedFile[] = [];

    Array.from(fileList).forEach((file, i) => {
      if (!allowed.includes(file.type)) {
        toast.error(`${file.name} — unsupported file type. Upload PDF, PNG, JPG, or Excel.`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit`);
        return;
      }
      const uploadFile: UploadedFile = {
        id: `file-${Date.now()}-${i}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Excel',
        status: 'uploading',
        progress: 0,
      };
      newFiles.push(uploadFile);
    });

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    // BACKEND INTEGRATION: POST /api/documents/upload (multipart/form-data)
    newFiles.forEach((f) => {
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 25 + 10;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((pf) => (pf.id === f.id ? { ...pf, status: 'done', progress: 100 } : pf))
          );
        } else {
          setFiles((prev) =>
            prev.map((pf) => (pf.id === f.id ? { ...pf, progress: Math.round(prog) } : pf))
          );
        }
      }, 200);
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const onSubmit = async (_data: SubmissionFormData) => {
    if (files.length === 0) {
      toast.error('At least one supporting document is required with your progress report');
      return;
    }
    const pendingUploads = files.filter((f) => f.status === 'uploading');
    if (pendingUploads.length > 0) {
      toast.error('Please wait for all documents to finish uploading');
      return;
    }
    // BACKEND INTEGRATION: POST /api/submissions { ...data, documentIds: files.map(f => f.id) }
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitted(true);
    toast.success(
      'Progress report submitted — your government officer will review within 3 business days'
    );
  };

  if (submitted) {
    return (
      <div className="card-base p-6 h-full flex flex-col items-center justify-center text-center gap-4">
        <div className="w-14 h-14 bg-accent/15 border border-accent/25 rounded-2xl flex items-center justify-center">
          <CheckCircle2 size={28} className="text-accent" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Submission Received</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Your Q3 FY26 progress report has been submitted. You&apos;ll receive a notification when
            it&apos;s reviewed.
          </p>
        </div>
        <div className="w-full p-3 bg-surface rounded-xl border border-border text-left">
          <p className="text-xs text-muted-foreground">Submission reference</p>
          <p className="font-mono text-sm font-medium text-foreground mt-0.5">
            SUB-2025-0923-FIN-007
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            reset();
            setFiles([]);
          }}
          className="btn-secondary text-sm w-full justify-center"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  return (
    <div className="card-base overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2.5 p-4 border-b border-border flex-shrink-0">
        <div className="w-8 h-8 bg-primary/15 border border-primary/20 rounded-lg flex items-center justify-center">
          <FilePlus size={15} className="text-primary" />
        </div>
        <div>
          <h2 className="section-header text-base">Submit Progress Report</h2>
          <p className="text-xs text-muted-foreground">Stage 2 · Q3 FY 2025–26</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4"
      >
        {/* Reporting period */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground" htmlFor="period">
            Reporting Period <span className="text-danger">*</span>
          </label>
          <select
            id="period"
            {...register('reportingPeriod', { required: 'Select a reporting period' })}
            className="input-field text-sm"
          >
            <option value="">Select period...</option>
            <option value="q3-fy26">Q3 FY 2025–26 (Oct–Dec 2025)</option>
            <option value="q2-fy26">Q2 FY 2025–26 (Jul–Sep 2025)</option>
            <option value="q1-fy26">Q1 FY 2025–26 (Apr–Jun 2025)</option>
          </select>
          {errors.reportingPeriod && (
            <p className="text-xs text-danger">{errors.reportingPeriod.message}</p>
          )}
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground" htmlFor="revenue">
              Revenue Actual (₹L) <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <DollarSign
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="revenue"
                type="number"
                step="0.1"
                {...register('revenueActual', {
                  required: 'Required',
                  min: { value: 0, message: 'Must be ≥ 0' },
                })}
                placeholder="e.g. 131"
                className="input-field pl-8 text-sm"
              />
            </div>
            {errors.revenueActual && (
              <p className="text-xs text-danger">{errors.revenueActual.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground" htmlFor="growth">
              Growth Rate (%) <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <TrendingUp
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="growth"
                type="number"
                step="0.1"
                {...register('growthRate', {
                  required: 'Required',
                })}
                placeholder="e.g. 34.2"
                className="input-field pl-8 text-sm"
              />
            </div>
            {errors.growthRate && (
              <p className="text-xs text-danger">{errors.growthRate.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground" htmlFor="customers">
              Active Customers
            </label>
            <div className="relative">
              <Users
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="customers"
                type="number"
                {...register('customerCount')}
                placeholder="e.g. 312"
                className="input-field pl-8 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground" htmlFor="ebitda">
              EBITDA Margin (%)
            </label>
            <div className="relative">
              <BarChart2
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="ebitda"
                type="number"
                step="0.1"
                {...register('ebitdaMargin')}
                placeholder="e.g. 4.2"
                className="input-field pl-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground" htmlFor="notes">
            Additional Notes
          </label>
          <p className="text-2xs text-muted-foreground">
            Explain any deviations from target, market context, or upcoming growth drivers
          </p>
          <textarea
            id="notes"
            {...register('notes')}
            rows={3}
            placeholder="e.g. Q3 growth driven by enterprise partnership with HDFC Bank onboarded in August..."
            className="input-field text-sm resize-none"
          />
        </div>

        {/* Document upload */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground">
            Supporting Documents <span className="text-danger">*</span>
          </label>
          <p className="text-2xs text-muted-foreground">
            Upload audited financials, bank statements, or growth proof. PDF, Excel, PNG · Max 10MB
            each
          </p>

          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
              dragOver
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/40 hover:bg-surface/50'
            }`}
          >
            <Upload size={20} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-xs font-medium text-foreground">
              {dragOver ? 'Drop files here' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-2xs text-muted-foreground mt-0.5">PDF · Excel · PNG · JPG</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.xlsx,.xls"
              className="sr-only"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-2.5 bg-surface rounded-lg border border-border"
                >
                  <div className="w-7 h-7 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={13} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-2xs text-muted-foreground">{file.size}</span>
                      {file.status === 'uploading' && (
                        <div className="flex-1 h-1 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-200"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                      {file.status === 'done' && <CheckCircle2 size={11} className="text-accent" />}
                      {file.status === 'error' && <AlertCircle size={11} className="text-danger" />}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="p-1 rounded hover:bg-danger/15 text-muted-foreground hover:text-danger transition-colors"
                    title="Remove file"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary justify-center py-3 text-sm font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Submitting report...
            </>
          ) : (
            <>
              <Upload size={15} />
              Submit Progress Report
            </>
          )}
        </button>
      </form>
    </div>
  );
}
