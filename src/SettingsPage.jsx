import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton'; 
import ThemeToggle from './ThemeToggle';

export default function Settings() {
  return (
    <>
      <div className="p-8 max-w-xl mx-auto text-gray-800 dark:text-gray-100">
        <Link
          to="/choose"
          title="Back to menu"
          className="no-underline text-inherit hover:opacity-80 transition cursor-pointer mb-10 block text-center"
        >
          <h1 className="text-4xl font-serif font-bold">MONU</h1>
          <p className="mt-4 italic text-gray-600 text-center">Turn the dials, tune the moment</p>
        </Link>

        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Theme</h2>
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <LogoutButton />
        </div>
      </div>

      <style>{`
        .policy-link {
          color: #666;
          text-decoration: underline;
          text-decoration-color: #666;
        }
        .policy-link:visited {
          color: #666;
        }
      `}</style>

      <p style={{ fontSize: "0.875rem", textAlign: "center", marginTop: "3rem" }}>
        <a
          href="https://ashwannasleep.github.io/monu-privacy/"
          target="_blank"
          rel="noopener noreferrer"
          className="policy-link"
        >
          Privacy Policy & Terms of Service
        </a>
      </p>
    </>
  );
}
