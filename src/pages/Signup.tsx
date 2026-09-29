import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, CheckCircle2, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Signup() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if (senha !== confirmacaoSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    if (data.user && data.session) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        nome: nome.trim(),
      });

      if (profileError) {
        setError(`A conta foi criada, mas não foi possível salvar o perfil: ${profileError.message}`);
        setIsLoading(false);
        return;
      }

      navigate('/');
      return;
    }

    setSuccessMessage('Cadastro realizado. Verifique seu e-mail para confirmar a conta.');
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-wider">MYDRAS</span>
          </div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300 mb-4">Comece sua jornada</p>
          <h1 className="text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Organize seu crescimento em um só lugar.
          </h1>
          <p className="text-gray-400 mt-6 max-w-md leading-relaxed">
            Crie sua conta para acompanhar clientes, oportunidades e resultados com uma visão mais inteligente do seu negócio.
          </p>
          <div className="mt-8 space-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Gestão comercial centralizada</div>
            <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Insights para tomar decisões melhores</div>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 w-full max-w-md mx-auto">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider">MYDRAS</span>
          </div>

          <div className="mb-7">
            <h2 className="text-2xl font-bold">Crie sua conta</h2>
            <p className="text-gray-400 mt-2 text-sm">Preencha seus dados para começar a usar a plataforma.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="text-sm text-gray-300">Nome</span>
              <div className="relative mt-2">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input required value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Como devemos chamar você?" className="w-full rounded-lg bg-black/20 border border-white/10 py-3 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70" />
              </div>
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">E-mail</span>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@empresa.com" className="w-full rounded-lg bg-black/20 border border-white/10 py-3 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70" />
              </div>
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">Senha</span>
              <div className="relative mt-2">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input required type="password" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Mínimo de 6 caracteres" className="w-full rounded-lg bg-black/20 border border-white/10 py-3 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70" />
              </div>
            </label>

            <label className="block">
              <span className="text-sm text-gray-300">Confirmar senha</span>
              <div className="relative mt-2">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input required type="password" value={confirmacaoSenha} onChange={(event) => setConfirmacaoSenha(event.target.value)} placeholder="Digite a senha novamente" className="w-full rounded-lg bg-black/20 border border-white/10 py-3 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70" />
              </div>
            </label>

            {error && <p className="rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
            {successMessage && <p className="rounded-lg border border-green-400/20 bg-green-500/10 px-3 py-2 text-sm text-green-300">{successMessage}</p>}

            <button disabled={isLoading} type="submit" className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-500 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading ? 'Criando conta...' : 'Criar conta'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Já possui uma conta? <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">Voltar ao dashboard</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
