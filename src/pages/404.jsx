import React from "react";
import Link from "next/link";
import { Button } from "reactstrap";

function Page404() {
  return (
    <div className="page404 text-center">
      <div className="contain">
        <h1>404</h1>
        <h4>Oops! Page not found</h4>
        <p>The page you are looking for does not exist.</p>
        <div className="text-center">
          <Link href="/">
            <a>
              <Button className="background-dark mr-3 px-5">Home</Button>
            </a>
          </Link>
          <Link href="/contact">
            <a>
              <Button className="background-orange px-4">Contact Us</Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page404;
