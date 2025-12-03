"use client";

import { ShowcaseCarousel } from "@/components/showcaseCarousel";


export default function Home() {
  return (
    <div>
      <div className="relative w-full">
          <ShowcaseCarousel images={"/kamaynihesus.jpg"} />
      
          <h1 className="absolute top-1/2 md:left-10 transform -translate-y-1/2 text-5xl md:text-left text-center font-bold px-15 text-white text-shadow-md text-shadow-black pointer-events-none">
          <span className="text-4xl">About Us</span>
        </h1>
      </div>

      <div className="w-full max-w-100 md:max-w-250 mx-auto py-10 px-4 text-lg text-justify">
        <h1 className="font-bold text-2xl">About the Website</h1><br/>
        <p>Lakbay Lucban is a QR-code web-based information system serving as centralized guides to enhance the trip planning and visitor experience in Lucban, Quezon by offering details about destinations selected by the Tourism Office of Lucban. This website was made as the output of a research conducted by Lucban Academy Senior Highschool Grade-12 Students to modernize the tourism experience in Lucban, Quezon.</p>
        <br/><p>This website was created using the following technologies; NextJS as the front-end, TailwindCSS for the styling, and ShadCN as component library. Other miscellaneous technologies such as Google Maps integration through embeds, GitHub for version control, and Vercel for static-site hosting. All images showcasing each destinations are available publicly in their respective Facebook Pages. The code for this website is open-sourced and is available for viewing, it can be found <a className="text-blue-700" href="https://github.com/Profility/walking-tours">here.</a></p>      
      </div>
      {/* <div className="w-full max-w-100 md:max-w-250 mx-auto px-4">
        <h1 className="font-bold text-2xl">Contact Us</h1><br/>
        <p className="text-lg text-justify">You can contact us via socials, e-mail or phone, feel free to contact us regarding questions, suggestions or feedback about the website!</p>
        <br/><ul>
          <li>
            <b>Phone Number:</b> +09999999999
          </li>
          <li>
            <b>Email Address:</b> placeholder@gmail.com
          </li>
          <li>
            <b>Facebook:</b> Placeholder
          </li>
        </ul>
      </div> */}
    </div>
  );
}
