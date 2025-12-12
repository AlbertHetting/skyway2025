"use client";
import Image from "next/image";
import { useEditMode } from "@/app/EditModeContext"; // path from NavDash to that file
import Link from "next/link";

type NavDashProps = {
  editMode: boolean;
  onToggleEdit: () => void;
};

export default function NavDash() {
  const { editMode, toggleEditMode } = useEditMode();


  const moveIconSrc = editMode
    ? "/img/widget-icon.png"
    : "/img/move-widget-icon.svg";

  return (
    <nav className="flex flex-row w-100 justify-between px-5">
      {/* Left button – you can still turn this into a Link later if you want */}
      <Link href="/widgets">
      <button type="button">
        <Image
          src="/img/widgets-icon.svg"
          alt="Widget"
          width={50}
          height={50}
          className="drop-shadow-lg"
        />
      </button>
      </Link>

    
      {/* Middle: toggle edit mode */}
      <button type="button" onClick={toggleEditMode}>
        <Image
          src={moveIconSrc}
          alt="Move widgets"
          width={50}
          height={50}
          className={`drop-shadow-lg ${
            editMode ? "opacity-100" : "opacity-70"
          }`}
        />
      </button>
      <Link href="/menu">
      {/* Right button – menu */}
      <button type="button">
        <Image
          src="/img/burger-menu-icon.svg"
          alt="Menu"
          width={50}
          height={50}
          className="drop-shadow-lg"
        />
      </button>
      </Link>
    </nav>
  );
}

