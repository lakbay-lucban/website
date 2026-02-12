import { FC } from "react";
import { Heart, Copyright } from "lucide-react";

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
        <div className="justify-between flex flex-col gap-5 md:flex-row mx-auto max-w-7xl px-6 py-8">
            <ul className="flex flex-col gap-2">
                <li className="font-bold">Related Links</li>
                <li>
                    <a href="https://www.facebook.com/LucbanAcademyofficial" className="hover:underline">Lucban Academy</a>
                </li>
                <li>
                    <a href="https://www.facebook.com/LucbanTourismOffice" className="hover:underline">Lucban Tourism Office</a>
                </li>
                <li>
                    <a href="https://www.facebook.com/LGULucbanQuezon" className="hover:underline">Local Government Unit</a>
                </li>
            </ul>
            <p>
                Copyright <Copyright className="inline size-4"/> 2026 Lucban Academy<br/>
                Made with <Heart className="inline size-4"/> by Marcus Calpe
            </p>
        </div>
    </footer>
  );
};