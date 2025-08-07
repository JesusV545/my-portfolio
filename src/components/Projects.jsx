import projects from '../data/projects.json';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Projects</h2>
        <p className="text-gray-600 mb-12">
          A selection of software and web development work I’ve done.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const imagePath = new URL(
              `../assets/projects/${project.image}`,
              import.meta.url
            ).href;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 text-left"
              >
                {project.image && (
                  <img
                    src={imagePath}
                    alt={`${project.title} preview`}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 text-sm mb-4">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
