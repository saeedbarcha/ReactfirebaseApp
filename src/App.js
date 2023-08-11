import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { db, auth , storage} from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { ref , uploadBytes} from "firebase/storage"

function App() {
  const [moviList, setMoviList] = useState([]);

  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOcsar, setIsNewMovieOcsar] = useState(false);

  //update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  //state for file to upload
  const [fileUpload, setFileUpload] = useState(null);

  // const moviesCollectionRef = collection(db, "lRxEV9lV6WVkVJU1g0EF")
  const moviesCollectionRef = collection(db, "movies");

  const getMoviList = async () => {
    //READ THE DATA
    //Set the movi list
    try {
      const data = await getDocs(moviesCollectionRef);
      console.log("data...", data);
      // filereddata
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log("filterData...", filteredData);

      setMoviList(filteredData);
    } catch (error) {
      console.log("error...", error)
    }
  };

  const onSubmitMovie = async () => {
    try {
      if(!auth?.currentUser){
      window.alert("sorry user in not signin")
      }else{
        const addedData = await addDoc(moviesCollectionRef, {
          title: newMovieTitle,
          releaseDate: newReleaseDate,
          receivedAnOscer: isNewMovieOcsar,
          userId:auth?.currentUser?.uid
        });
  
        if (addedData) {
          setNewMovieTitle("");
          setNewReleaseDate("");
          setIsNewMovieOcsar("");

          getMoviList();
          window.alert(`movie is added successfully ${newMovieTitle}`)
        }
      }
      
    } catch (error) {
      console.log("error...", error)
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (error) {
      console.log("error...", error)
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title:updatedTitle});
    } catch (error) {
      console.log("error...", error)
    }
  };

  
  const uploadFileToStorage = async () => {
    try {
     if(!fileUpload) return;
     
     const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
     await uploadBytes(fileFolderRef, fileUpload)
    } catch (error) {
      console.log("error...", error)
    }
  };

  useEffect(() => {
    getMoviList();
  }, [onSubmitMovie]);

  return (
    <div className="App">
      <p>saeed</p>
      <Auth />
      <br />
      <br />
      <hr />
      <hr />
      <h2>add a movies</h2>
      <div>
        <input
          placeholder="Movie Title..."
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date.."
          type="date"
          value={newReleaseDate}
          onChange={(e) => setNewReleaseDate(e.target.value)}
        />
        <input
          type="checkbox"
          checked={isNewMovieOcsar}
          onChange={(e) => setIsNewMovieOcsar(e.target.checked)}
        />
        <label>Received an oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <br />
      <br />
      <hr />
      <hr />
      <h2>list of movies</h2>
      <div>
        {moviList?.map((movie) => (
          <div key={movie?.id}>
            <h1 style={{ color: movie?.receivedAnOscer ? "green" : "red" }}>
              title: {movie?.title}
            </h1>
            <p>Data: {movie?.releaseDate}</p>
            <button onClick={() => deleteMovie(movie?.id)}>Delete Movie</button>
            <input
              type="text"
              placeholder="Update Title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie?.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <hr />
      <hr />
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button  onClick={uploadFileToStorage}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
