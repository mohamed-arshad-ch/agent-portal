import "@/styles/globals.css";
import { Poppins } from 'next/font/google';


const poppins = Poppins({
  subsets: ['latin'], // Specify subsets for language support
  weight: ['400', '500', '600', '700'], // Choose weights as per your requirement
});
export default function App({ Component, pageProps }) {
  return   (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  );
}
