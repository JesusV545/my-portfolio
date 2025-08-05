export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
        Hi, I’m Jesus Vazquez.
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-xl">
        I’m a software QA tester and frontend developer focused on building high-quality, accessible, and efficient user experiences.
      </p>
      <a
        href="#projects"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
      >
        View My Work
      </a>
    </section>
  );
}
