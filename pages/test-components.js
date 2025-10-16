import Head from 'next/head';
import ComponentTest from '../components/ComponentTest';

export default function TestComponents() {
  return (
    <div>
      <Head>
        <title>Test Components - Sistema de Riego</title>
        <meta name="description" content="Página de prueba para componentes UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
        />
      </Head>

      <main>
        <ComponentTest />
      </main>

      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      ></script>
    </div>
  );
}