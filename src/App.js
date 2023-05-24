import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/auth";
import { db, auth, storage } from "./config/Firebase";
// to get the collection of the movie
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
function App() {
  const [movieList, setMovieList] = useState([]);
  const movieCollectionRef = collection(db, "movies");
  const getMovieList = async () => {
    // READ THE DATA FROM DATABASE
    // SET THE MOVIE LIST
    try {
      const data = await getDocs(movieCollectionRef);
      console.log(data);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);
  // new moive state
  const [newMovieTitle, setnewMovieTitle] = useState("");
  const [newMovieRealeaseDate, setnewMovieRealeaseDate] = useState(0);
  const [movieOscar, setmovieOscar] = useState(true);
  const OnSubmit = async () => {
    try {
      await addDoc(movieCollectionRef, {
        Title: newMovieTitle,
        receivedAnOscar: movieOscar,
        releaseDate: newMovieRealeaseDate,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  // delete movie method
  const deleteMovie = async (id) => {
    console.log("working");
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  // update the title of the movie
  const [UpdateField, setUpdateField] = useState(false);
  const [UpdateTitle, SetUpdateTitle] = useState("");
  const UpdateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { Title: UpdateTitle });
  };

  // file update states
  const [fileUpload, setFileUpload] = useState(null);
  const UploadFile = async () => {
    if (!fileUpload) return;

    const fileFolderRef = ref(storage, `projectfiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <div>
        {/* operation to print the whole data base movie name */}
        {movieList.map((movie) => (
          <div>
            <h1>{movie.Title}</h1>
            <h1>{movie.releaseDate}</h1>
            <button onClick={() => deleteMovie(movie.id)}>delete</button>
            <button onClick={() => setUpdateField(!UpdateField)}>Update</button>
            {UpdateField && (
              <div>
                <input
                  placeholder="new title.."
                  onChange={(e) => SetUpdateTitle(e.target.value)}
                />
                <button onClick={() => UpdateMovieTitle(movie.id)}>
                  Update Title
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        ></input>
        <button onClick={UploadFile}>Upload File</button>
      </div>
      <div>
        <input
          placeholder="Moive title..."
          onChange={(e) => setnewMovieTitle(e.target.value)}
        ></input>
        <input
          placeholder="release date"
          type="number"
          onChange={(e) => setnewMovieRealeaseDate(Number(e.target.value))}
        ></input>
        <input
          type="checkbox"
          checked={movieOscar}
          onChange={(e) => setmovieOscar(e.target.checked)}
        ></input>
        <label>Win the oscar </label>
        <button onClick={OnSubmit}>Submit</button>
      </div>
      <Auth></Auth>
    </div>
  );
}

export default App;
