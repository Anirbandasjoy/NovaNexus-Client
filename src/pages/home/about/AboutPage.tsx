const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <section className="container mx-auto my-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700">
            We are a team of passionate professionals dedicated to delivering
            top-notch solutions to our clients. With a commitment to excellence
            and innovation, we strive to exceed expectations in everything we
            do.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading provider of innovative solutions that drive
              success and growth for our clients.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To deliver high-quality services and solutions through dedication,
              expertise, and a client-centered approach.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 bg-gray-400"></div>
            </div>
            <div className="space-y-12">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Founded in 2020</h3>
                  <p>Started with a small team and big dreams.</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">First Major Project</h3>
                  <p>
                    Successfully completed our first major project with
                    outstanding results.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full text-white flex items-center justify-center">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Expanded Our Team</h3>
                  <p>Grew our team to include experts from various fields.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
