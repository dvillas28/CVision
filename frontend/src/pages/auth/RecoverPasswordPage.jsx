import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { AuthField } from '../../components/auth/index.js';
import { Button } from '../../components/ui/Button.jsx';

function validateRecover(values) {
  if (!values.email) {
    return { email: 'Ingresa el email asociado a tu cuenta.' };
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    return { email: 'Ingresa un email válido.' };
  }

  return {};
}

export function RecoverPasswordPage() {
  const [values, setValues] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateRecover(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSent(false);
      return;
    }

    setErrors({});
    setSent(true);
  }

  return (
    <>
      <div className="space-y-2 text-center">
        <p className="font-heading text-label-sm uppercase text-on-surface-variant">Recuperación de acceso</p>
        <h1 className="font-heading text-headline-md text-primary">Restablece tu contraseña</h1>
        <p className="text-body-sm text-on-surface-variant">
          Te enviaremos instrucciones seguras para recuperar tu cuenta CVision.
        </p>
      </div>

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <AuthField
          id="recover-email"
          label="Email"
          type="email"
          icon={Mail}
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={(event) => {
            setValues({ email: event.target.value });
            setErrors({});
            setSent(false);
          }}
        />

        {sent ? (
          <div className="rounded border border-secondary-container bg-secondary-container px-4 py-3 text-body-sm text-on-secondary-container">
            Si el email existe, recibirás un enlace de recuperación en unos minutos.
          </div>
        ) : null}

        <Button type="submit" className="btn-hero-arrow h-12 w-full rounded">
          Enviar instrucciones
          <ArrowRight aria-hidden="true" size={18} />
        </Button>
      </form>

      <Link
        to="/auth"
        className="flex items-center justify-center gap-2 font-heading text-label-md text-secondary hover:underline"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        Volver al inicio de sesión
      </Link>
    </>
  );
}
