export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-brand-100 via-white to-brand-300 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-brand-900">
        Hi, I'm Jesus Vazquez.
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-brand-700 max-w-xl">
        Computer Science student and EMT building practical web applications 
        while working toward a career in IT systems and cybersecurity.
      </p>
      <a
        href="#projects"
        className="mt-6 inline-block bg-brand-500 hover:bg-brand-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow"
      >
        Explore My Work
      </a>
    </section>
  );
}
