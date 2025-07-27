import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        navigate('/login');
      }
    });

    const fetchMaterials = async () => {
      const q = query(collection(db, 'materials'), where('available', '==', true));
      const querySnapshot = await getDocs(q);
      const fetchedMaterials = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMaterials(fetchedMaterials);
    };

    fetchMaterials();
    return () => unsubscribe();
  }, [navigate]);

  const logout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    alert(`${item.name.trim()} added to cart`);
  };

  return (
    <div className="container mt-5">
      <h2>Welcome, {userData?.email}</h2>
      <p>Role: {userData?.role}</p>
      <button className="btn btn-danger mb-4" onClick={logout}>
        Logout
      </button>

      <h4>Available Raw Materials</h4>
      <div className="row">
        {materials.length > 0 ? (
          materials.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.name.trim()}</h5>
                  <p className="card-text">Price: ₹{item.price} / {item.unit}</p>
                  <button className="btn btn-primary" onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No materials available.</p>
        )}
      </div>

      {cart.length > 0 && (
        <>
          <h4 className="mt-5">🛒 Your Cart</h4>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.name.trim()} - ₹{item.price} / {item.unit}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Dashboard;
