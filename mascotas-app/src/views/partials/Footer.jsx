import React, { useState, useEffect } from "react";

function Footer() {
  return (
    <>
      {/*  Footer  */}
      <footer className="bg-light text-center position-relative" >
        {/*  Grid container  */}
        <div className="container p-4">
          {/*  Section: Social media  */}
          <section className="mb-4">
            
            {/*  Linkedin  */}
            <a
              className="btn btn-primary btn-floating m-1"
              style={{backgroundColor: "0082ca"}}
              href={"https://www.linkedin.com/in/victor-jesus-maximo-abundio/"}
              target={"_blank"}
              role="button"
              
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            {/*  Github  */}
            <a
              className="btn btn-primary btn-floating m-1"
              style={{backgroundColor: "333333"}}
              href={"https://github.com/ProgrammerAuditore"}
              target={"_blank"}
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
          {/*  Section: Social media  */}

          {/*  Section: Text  */}
          <section className="mb-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              distinctio earum repellat quaerat voluptatibus placeat nam,
              commodi optio pariatur est quia magnam eum harum corrupti dicta,
              aliquam sequi voluptate quas.
            </p>
          </section>
          {/*  Section: Text  */}
        </div>
        {/*  Grid container  */}

        {/*  Copyright  */}
        <div
          className="text-center p-3"
          style={{backgroundColor : "rgba(0, 0, 0, 0.2)"}}
        >
          © 2020 Copyright:
          <a className="text-dark" target={"_blank"} href={"https://github.com/ProgrammerAuditore?tab=repositories"}>
            ProgrammerAuditore
          </a>
        </div>
        {/*  Copyright  */}
      </footer>
      {/*  Footer  */}
    </>
  );
}

export default Footer;
