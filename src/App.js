// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VendorDashboard from './components/dashboard/VendorDashboard';
import WholesalerDashboard from './components/dashboard/WholesalerDashboard';
import Navbar from './components/common/Navbar'; // ✅ Corrected path

function RoleBasedRedirect() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, 'users', user.uid));
        const data = snap.data();
        if (data?.role === 'vendor') navigate('/vendor');
        else if (data?.role === 'wholesaler') navigate('/wholesaler');
        else navigate('/');
      } else {
        navigate('/');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return loading ? <p className="text-center mt-5">Redirecting...</p> : null;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<RoleBasedRedirect />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/wholesaler" element={<WholesalerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
