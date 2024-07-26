'use client'


export default function LoginPage() {

    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ error: false, message: '' })
    const router = useRouter()

    const toggleVisibility = () => {
        setIsVisible(prev => !prev)
    }
    const { handleSubmit, register, formState: { errors } } = useForm<LoginValues>({ resolver: yupResolver(shema) })

    const onSubmit = async (data: LoginValues) => {
        try {
            setError({ error: false, message: '' })
            setLoading(true)
            const request = await signIn({ email: data.email, password: data.password })
            if (!request?.isSuccess) {
                setError({ error: true, message: request?.message ? request?.message : "Error desconocido, vuelva a intentarlo." })
            } else {
                router.push('/')
            }
            setLoading(false)
        } catch (err) {
            console.log(err)
            setError({ error: true, message: "Error desconocido, vuelva a intentarlo." })
            setLoading(false)

        }
    }


    return (


        <section className=" relative grid grid-cols-1 w-[q00vw] md:w-full  lg:grid-cols-2 dark:bg-[#18181b]">
            <div className="bg-cover bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url("${loginTextData.background}")`
                }}
            ></div>
            <div className="absolute right-3 top-3  ">
                <Logo />
            </div>
            <div className="lg:p-4 ">
                <div className="min-h-[100vh] w-full flex items-center justify-start  p-4">
                    <div className="w-full  p-8 rounded-lg  max-w-[550px] m-auto flex flex-col gap-4">
                        <h1 className="text-2xl font-bold text-white">{loginTextData.formTitle}</h1>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium text-gray-300" >
                                    {loginTextData.emailLabel}
                                </label>
                                <Input
                                    className=""
                                    placeholder="Ingresa tu email"
                                    type="email"
                                    register={register("email")}
                                />
                                {
                                    errors.email && <InputError>{errors.email.message}</InputError>
                                }
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium text-gray-300" >
                                    {loginTextData.passwordLabel}
                                </label>
                                <Input
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                            {isVisible ? (
                                                <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    placeholder="*********"
                                    type={isVisible ? "text" : "password"}
                                    className="w-full"
                                    register={register("password")}
                                />
                                {
                                    errors.password && <InputError>{errors.password.message}</InputError>
                                }
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {/* <Checkbox id="remember" />
                                    <label className="text-sm text-gray-300" >
                                        {loginTextData.rememberButton}
                                    </label> */}
                                </div>
                                <Link className="text-sm text-blue-500 hover:underline" href="/recover-password">
                                    {loginTextData.forgottenPassword}
                                </Link>
                            </div>
                            <Button
                                isLoading={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">{loginTextData.submitButton}</Button>
                        </form>
                        {error.error && <div>
                            <Alert title="Inicio de sesión fallido" text={error.message} />
                        </div>}

                        {/* <div className="flex items-center justify-center">
                            <div className="h-px w-full bg-gray-600" />
                            <span className="px-3 text-sm text-gray-400">{loginTextData.rememberButton}</span>
                            <div className="h-px w-full bg-gray-600" />
                        </div>
                        <div className="space-y-4">
                            <Button className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-100 text-gray-800">
                                <span>{loginTextData.googleRegister}</span>
                            </Button>
                        </div> */}
                        <div className="text-center">
                            <span className="text-sm text-gray-400">{loginTextData.noAccount}</span>
                            <Link className="text-sm text-blue-500 hover:underline" href="/signup">
                                {" "}
                                {loginTextData.recordTexdt}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}