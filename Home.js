import "./home.css";
import NavBar from "../navbar/NavBar";
function Home() {
  return (
    <>
      <NavBar></NavBar>
      <hr />

      <div className="imagecard">
        <img src="assets/Real-time Accent Translator.gif" alt="" />
      </div>

      <div className="content1">
        <img src="assets/voice-command.png" alt="" />
        <div className="subcontent">
          <h2>Why Accent Translation is Necessary </h2>
          <p>
            In an increasingly globalized world, effective communication is key
            to collaboration and success. However, diverse accents often lead to
            misunderstandings, miscommunications, and even exclusion during
            voice or video interactions. Accent translation bridges this gap by
            improving comprehension, fostering inclusivity, and ensuring
            smoother communication across cultures and linguistic backgrounds.
          </p>
          <h2>A Good Starting Point</h2>
          <p>
            "Imagine attending a global meeting where everyone's contributions
            are seamlessly understood, regardless of their accent or native
            language. Accent translation makes this possible by breaking down
            linguistic barriers, enabling more inclusive and productive
            conversations."
          </p>
        </div>
      </div>
      <footer>
        <div className="proj">
          <img src="assets/github.png" alt="" />
          <a href="">This project</a>
        </div>
        <h3>Under the guidance of Dr.Saravana Kumar</h3>
        <span>
          <h3>(Assistant Professor)</h3>
        </span>
        <p>School of Computer Science</p>
        <p>Presidency University, Bengaluru</p>
      </footer>
    </>
  );
}

export default Home;
