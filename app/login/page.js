"use client";
import {  useState } from "react";

import { Input, Button, Card, CardBody } from "@nextui-org/react"; // Asegúrate de importar tus componentes correctamente
import { useRouter } from "next/navigation";

import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const router = useRouter();
 
  const { login } = useLogin();

  const singIn = async () => {
    setError({ error: false, message: "" });

    setLoading(true);

    await login(userData.email, userData.password)
      .then((res) => {
        setLoading(false);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError({ error: true, message: err.response.data.debugInfo });
      });
  };


 

  return (
    <section className="relative grid grid-cols-1 w-full dark:bg-[#18181b]">
      <div className="lg:p-4">
        <div className="min-h-[100vh] w-full flex items-center justify-start p-4">
          <div className="w-full p-8 rounded-lg max-w-[550px] m-auto flex flex-col gap-4">
            <h1 className="text-2xl font-bold dark:text-white ">Iniciar Sesión</h1>
            <p className="text-sm text-blue-500 hover:underline cursor-pointer">
              Cualquier usuario o contraseña funciona
            </p>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium dark:text-gray-300">
                Correo Electrónico
              </label>
              <Input
                className=""
                value={userData.email}
                onChange={(e) =>
                  setUserData((s) => ({ ...s, email: e.target.value }))
                }
                placeholder="Ingresa tu email"
                type="email"
              />
              {/* Mensaje de error para email */}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium dark:text-gray-300">
                Contraseña
              </label>
              <Input
                value={userData.password}
                onChange={(e) =>
                  setUserData((s) => ({ ...s, password: e.target.value }))
                }
                placeholder="*********"
                type={isVisible ? "text" : "password"}
                className="w-full"
              />
              {/* Mensaje de error para contraseña */}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Checkbox y etiqueta para "Recordarme" */}
              </div>
              <p className="text-sm text-blue-500 hover:underline cursor-pointer">
                ¿Olvidaste tu contraseña?
              </p>
            </div>
            <Button
              onPress={singIn}
              isLoading={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              type="submit"
            >
              Iniciar Sesión
            </Button>

            {error.error && (
              <div>
                <Card>
                  <CardBody className="text-center">
                    <p className="font-bold">Inicio de sesión fallido</p>
                    <p className="text-sm">{error.message}</p>
                  </CardBody>
                </Card>
              </div>
            )}
            <div className="text-center">
              <span className="text-sm  dark:text-gray-400">
                ¿No tienes una cuenta?
              </span>
              <p className="text-sm text-blue-500 hover:underline cursor-pointer">
                Regístrate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
