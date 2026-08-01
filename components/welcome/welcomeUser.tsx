interface pageData {
  name: string | undefined;
  page: string;
  message?: string;
}

export function Welcome({ name, page, message }: pageData) {
  return (
    <div
      className={`font-Libertinus tracking-widest flex gap-4 items-center flex-col flex-1 sm:flex-none justify-center sm:items-start sm:justify-start`}
    >
      <span className="text-3xl font-semibold flex text-left p-2 gap-1 items-center">
        <h1>{page.toUpperCase()}</h1>
      </span>
      <span className="font-semibold p-3 text-white">
        <h2 className="text-md text-center sm:text-left sm:text-2xl">
          Seja Bem Vindo,{" "}
          <span className="text-text-register font-bold">
            {name?.toUpperCase()}
          </span>
        </h2>
        <p className="text-gray-400  text-center text-xs sm:text-left">
          {message
            ? message
            : `Visualize seu histórico de ${page}`}
        </p>
      </span>
    </div>
  );
}
