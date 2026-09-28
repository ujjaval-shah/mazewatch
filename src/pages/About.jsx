const About = () => {
  return (
    <>
      <div className="mt-4 text-center page-heading">
        <h2>
          About{" "}
          <a href="https://github.com/ujjaval-shah/mazewatch">
            <i className="bi bi-github"></i>
          </a>
        </h2>
      </div>

      <div className="mt-4 text-center">
        <strong>MazeWatch</strong> is a React-based web application that allows
        users to search and track their favorite TV shows and episodes using the
        TVMaze API. Users can save their favorite content to custom Favourite
        Shows and Favourite Episodes lists, which are saved locally in the
        browser using LocalStorage; no account or login required.
        <br />
        <br />
        Made with React and React Router. Stylized with Bootstrap.
        <br />
        <br />
        <strong>
          <a href="https://github.com/ujjaval-shah/mazewatch">
            Github Repo Link
          </a>
        </strong>
      </div>
    </>
  );
};

export default About;
