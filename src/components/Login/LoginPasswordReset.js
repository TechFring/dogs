import React from "react";
import Input from "../Form/Input";
import Button from "../Form/Button";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { PASSWORD_RESET } from "../../api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../../components/Helper/Head";

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState("");
  const [key, setKey] = React.useState("");
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const url = new URL(window.location.href);
    const key = url.searchParams.get("key");
    const login = url.searchParams.get("login");

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!password.validate()) return;

    const { url, options } = PASSWORD_RESET({
      login,
      key,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response.ok) navigate("/login");
  }

  return (
    <section className="animeLeft">
      <Head title="Resetar senha" />

      <h1 className="title">Resete a Senha</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />

        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
