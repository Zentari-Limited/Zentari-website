import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDv8guMBIkPgw1i0MvajPRG2EEace5EGyQ',
  authDomain: 'zent-b5a55.firebaseapp.com',
  projectId: 'zent-b5a55',
  storageBucket: 'zent-b5a55.firebasestorage.app',
  messagingSenderId: '650621000983',
  appId: '1:650621000983:web:1335dbe111fc520949eb52',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const submitButton = form.querySelector('.submit-button');
const submitLabel = form.querySelector('.submit-label');

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = '';
  status.classList.remove('error');

  // Quietly discard automated submissions caught by the hidden honeypot.
  if (form.elements.website.value.trim()) {
    form.reset();
    status.textContent = 'Thanks for getting in touch. Your message has been received.';
    return;
  }

  const formData = new FormData(form);
  const payload = {
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    company: formData.get('company').trim(),
    topic: formData.get('topic'),
    message: formData.get('message').trim(),
    source: 'Zentari Limited website',
    recordType: 'website_feedback',
    createdAt: serverTimestamp(),
  };

  submitButton.disabled = true;
  submitLabel.textContent = 'Sending…';

  try {
    await addDoc(collection(db, 'Website_Feedback'), payload);
    form.reset();
    status.textContent = 'Thanks for getting in touch. Your message has been received.';
  } catch (error) {
    console.error('Could not save Zentari website feedback:', error);
    status.textContent = 'We couldn’t send your message just now. Please try again in a moment.';
    status.classList.add('error');
  } finally {
    submitButton.disabled = false;
    submitLabel.textContent = 'Send message';
  }
});
