'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Eye,
  EyeOff,
  Shield,
  Building2,
  Layers,
  TrendingUp,
  Target,
  Copy,
  Check,
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  User,
  ChevronRight,
} from 'lucide-react';
import AppLogo from '@/Components/UI/AppLogo';

type AuthMode = 'login' | 'signup';
type Role = 'government' | 'startup';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
  role: Role;
}

const demoCredentials = [
  {
    id: 'cred-gov',
    role: 'Garvit Manwani · Government Officer' as const,
    email: 'manwanigarvit69@gmail.com',
    password: 'GovOfficer@2025',
    roleKey: 'government' as Role,
    description: 'Full portfolio access · Fund release authority',
  },
  {
    id: 'cred-startup',
    role: 'Ayan Sharma · Startup Founder' as const,
    email: 'ayansharma69@gmail.com',
    password: 'Startup@FinFlow25',
    roleKey: 'startup' as Role,
    description: 'FinFlow Pvt Ltd · Stage 2 Active',
  },
];

const programStats = [
  { id: 'stat-startups', label: 'Funded Startups', value: '12', icon: Building2 },
  { id: 'stat-disbursed', label: 'Total Disbursed', value: '₹4.2Cr', icon: Layers },
  { id: 'stat-achieved', label: 'Milestones Achieved', value: '33', icon: Target },
  { id: 'stat-growth', label: 'Avg. Growth Rate', value: '23.7%', icon: TrendingUp },
];

export default function AuthScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const loginForm = useForm<LoginForm>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const signupForm = useForm<SignupForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      organizationName: '',
      role: 'startup',
    },
  });

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const autofillCredential = (cred: (typeof demoCredentials)[0]) => {
    loginForm.setValue('email', cred.email);
    loginForm.setValue('password', cred.password);
    toast.success(`Credentials filled for ${cred.role}`);
  };

  const onLogin = async (data: LoginForm) => {
    setLoading(true);
    // BACKEND INTEGRATION: POST /api/auth/login { email, password }
    await new Promise((r) => setTimeout(r, 1400));

    const govCred = demoCredentials.find((c) => c.roleKey === 'government');
    const startupCred = demoCredentials.find((c) => c.roleKey === 'startup');

    if (data.email === govCred?.email && data.password === govCred?.password) {
      toast.success('Welcome back, Garvit Manwani — Program Officer');
      setLoading(false);
      router.push('/');
    } else if (data.email === startupCred?.email && data.password === startupCred?.password) {
      toast.success('Welcome back, Ayan Sharma — FinFlow Pvt Ltd');
      setLoading(false);
      router.push('/startup-portal');
    } else {
      setLoading(false);
      loginForm.setError('email', {
        message: 'Invalid credentials — use the demo accounts below to sign in',
      });
    }
  };

  const onSignup = async (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      signupForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    setLoading(true);
    // BACKEND INTEGRATION: POST /api/auth/register { name, email, password, organizationName, role }
    await new Promise((r) => setTimeout(r, 1600));
    toast.success('Account created — pending approval by program administrator');
    setLoading(false);
    setMode('login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col w-[480px] xl:w-[520px] bg-card border-r border-border flex-shrink-0 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col h-full px-10 py-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <AppLogo size={36} />
            <div>
              <span className="font-semibold text-lg text-foreground tracking-tight">
                SetuProcure
              </span>
              <p className="text-2xs text-muted-foreground uppercase tracking-widest">
                DPIIT Innovation Program
              </p>
            </div>
          </div>

          {/* Hero copy */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <div className="w-1.5 h-1.5 bg-primary rounded-full pulse-dot" />
              FY 2025–26 Active Cohort
            </div>

            <h1 className="text-3xl xl:text-4xl font-bold text-foreground leading-tight mb-4">
              Milestone-based
              <br />
              <span className="text-primary">funding,</span> tracked
              <br />
              end-to-end.
            </h1>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              SetuProcure connects government disbursement workflows to startup performance data.
              Set milestones, track progress, verify submissions, release funding — all in one
              place.
            </p>

            {/* Program stats */}
            <div className="grid grid-cols-2 gap-3 mt-10">
              {programStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.id} className="p-4 bg-surface/50 border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} className="text-primary" />
                      <span className="text-2xs text-muted-foreground uppercase tracking-wide">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-xl font-bold font-mono-nums text-foreground">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-center gap-2 mt-8">
            <Shield size={14} className="text-muted-foreground/60" />
            <p className="text-xs text-muted-foreground/60">
              Role-based access · Encrypted documents · Full audit trail
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto scrollbar-thin">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <AppLogo size={32} />
            <span className="font-semibold text-foreground">SetuProcure</span>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center bg-surface border border-border rounded-xl p-1 mb-8">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={`mode-${m}`}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mode === m
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {mode === 'login' ? (
            <LoginFormSection
              form={loginForm}
              onSubmit={onLogin}
              loading={loading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ) : (
            <SignupFormSection
              form={signupForm}
              onSubmit={onSignup}
              loading={loading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirm={showConfirm}
              setShowConfirm={setShowConfirm}
            />
          )}

          {/* Demo credentials */}
          {mode === 'login' && (
            <div className="mt-6 p-4 bg-surface/50 border border-border rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-warning/15 rounded flex items-center justify-center">
                  <Lock size={11} className="text-warning" />
                </div>
                <p className="text-xs font-semibold text-foreground">Demo Credentials</p>
                <span className="text-2xs text-muted-foreground ml-auto">
                  Click row to autofill
                </span>
              </div>
              <div className="space-y-2">
                {demoCredentials.map((cred) => (
                  <div
                    key={cred.id}
                    onClick={() => autofillCredential(cred)}
                    className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        cred.roleKey === 'government' ? 'bg-primary/15' : 'bg-accent/15'
                      }`}
                    >
                      {cred.roleKey === 'government' ? (
                        <Shield size={13} className="text-primary" />
                      ) : (
                        <Building2 size={13} className="text-accent" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{cred.role}</p>
                      <p className="text-2xs text-muted-foreground truncate">{cred.email}</p>
                      <p className="text-2xs text-muted-foreground/60 mt-0.5">{cred.description}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(cred.email, `${cred.id}-email`);
                        }}
                        title="Copy email"
                        className="p-1 rounded hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedField === `${cred.id}-email` ? (
                          <Check size={11} className="text-accent" />
                        ) : (
                          <Copy size={11} />
                        )}
                      </button>
                      <ChevronRight size={13} className="text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoginFormSection({
  form,
  onSubmit,
  loading,
  showPassword,
  setShowPassword,
}: {
  form: ReturnType<typeof useForm<LoginForm>>;
  onSubmit: (d: LoginForm) => void;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
        <p className="text-sm text-muted-foreground mt-1">Sign in to your SetuProcure account</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground" htmlFor="login-email">
          Email address
        </label>
        <div className="relative">
          <Mail
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            id="login-email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
            placeholder="you@organization.gov.in"
            className="input-field pl-9"
            autoComplete="email"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-danger mt-1 flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-danger/20 flex items-center justify-center text-2xs">
              !
            </span>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-foreground" htmlFor="login-password">
            Password
          </label>
          <button
            type="button"
            className="text-xs text-primary hover:text-blue-400 transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            placeholder="Enter your password"
            className="input-field pl-9 pr-10"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="remember"
          type="checkbox"
          {...register('remember')}
          className="rounded border-border accent-primary cursor-pointer"
        />
        <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">
          Keep me signed in for 30 days
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary justify-center py-3 text-sm font-semibold"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign In to SetuProcure
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}

function SignupFormSection({
  form,
  onSubmit,
  loading,
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
}: {
  form: ReturnType<typeof useForm<SignupForm>>;
  onSubmit: (d: SignupForm) => void;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirm: boolean;
  setShowConfirm: (v: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;
  const selectedRole = watch('role');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Create account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          New accounts require program administrator approval
        </p>
      </div>

      {/* Role selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">Account type</label>
        <div className="grid grid-cols-2 gap-2">
          {(['government', 'startup'] as const).map((r) => (
            <label
              key={`role-${r}`}
              className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                selectedRole === r
                  ? r === 'government'
                    ? 'bg-primary/10 border-primary/40 text-primary'
                    : 'bg-accent/10 border-accent/40 text-accent'
                  : 'bg-surface border-border text-muted-foreground hover:border-border/80'
              }`}
            >
              <input
                type="radio"
                value={r}
                {...register('role', { required: true })}
                className="sr-only"
              />
              {r === 'government' ? (
                <Shield size={15} className="flex-shrink-0" />
              ) : (
                <Building2 size={15} className="flex-shrink-0" />
              )}
              <div>
                <p className="text-xs font-semibold capitalize">
                  {r === 'government' ? 'Government' : 'Startup'}
                </p>
                <p className="text-2xs opacity-70">
                  {r === 'government' ? 'Program Officer' : 'Founder / Team'}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground" htmlFor="signup-name">
          Full name
        </label>
        <div className="relative">
          <User
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            id="signup-name"
            type="text"
            {...register('name', { required: 'Full name is required' })}
            placeholder="Garvit Manwani"
            className="input-field pl-9"
          />
        </div>
        {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground" htmlFor="signup-org">
          {selectedRole === 'government' ? 'Department / Ministry' : 'Startup / Organization name'}
        </label>
        <div className="relative">
          <Building2
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            id="signup-org"
            type="text"
            {...register('organizationName', { required: 'Organization name is required' })}
            placeholder={
              selectedRole === 'government' ? 'DPIIT, Ministry of Commerce' : 'FinFlow Pvt Ltd'
            }
            className="input-field pl-9"
          />
        </div>
        {errors.organizationName && (
          <p className="text-xs text-danger">{errors.organizationName.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground" htmlFor="signup-email">
          Email address
        </label>
        <div className="relative">
          <Mail
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            id="signup-email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
            })}
            placeholder={selectedRole === 'government' ? 'you@ministry.gov.in' : 'you@startup.in'}
            className="input-field pl-9"
          />
        </div>
        {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground" htmlFor="signup-password">
          Password
        </label>
        <div className="relative">
          <Lock
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                message: 'Must contain uppercase, number, and special character',
              },
            })}
            placeholder="Min. 8 chars with uppercase & symbol"
            className="input-field pl-9 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground" htmlFor="signup-confirm">
          Confirm password
        </label>
        <div className="relative">
          <Lock
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            id="signup-confirm"
            type={showConfirm ? 'text' : 'password'}
            {...register('confirmPassword', { required: 'Please confirm your password' })}
            placeholder="Re-enter your password"
            className="input-field pl-9 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-danger">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary justify-center py-3 text-sm font-semibold"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            Request Account Access
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="text-2xs text-muted-foreground text-center leading-relaxed">
        By creating an account you agree to the{' '}
        <span className="text-primary hover:underline cursor-pointer">Terms of Use</span> and{' '}
        <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span> of the
        DPIIT Innovation Program.
      </p>
    </form>
  );
}
