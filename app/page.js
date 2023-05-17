
import Head from "next/head";
import Main from "@/components/Main";

const page = () => {
  

  return (
    <section>
      <Head>
        <title>Employee Management App</title>
        <meta name="description" content="Complate company system management" />
      </Head>
      <main className="py-5">
       <Main />
      </main>
    </section>
  );
};

export default page;
