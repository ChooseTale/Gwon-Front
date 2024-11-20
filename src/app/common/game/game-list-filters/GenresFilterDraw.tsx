"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/ui/Drawer.tsx";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";
import { GENRES } from "@/constants/genres";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/packages/ui/components/ui/Button";
import { slidersIcon, xGrayscaleIcon, slidersActiveIcon } from "@/asset/icons";

interface GameListSelectProps {
  searchParams: FormattedSearchParams;
  handleGenreChange: (newGenre: string) => void;
}

export default function GenresFilterDraw({
  searchParams,
  handleGenreChange,
}: GameListSelectProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    searchParams.genre,
  ]);
  const selectedCount = selectedGenres.filter((e) => e !== "ALL").length;
  const DEFAULT_GENRE = "ALL";

  const onClose = () => {
    setIsOpen(false);
  };

  const onReset = () => {
    setSelectedGenres([]);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenres((prevGenres) => {
      let updatedGenres = prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres.filter((g) => g !== DEFAULT_GENRE), genre];

      if (updatedGenres.length === 0) updatedGenres = [DEFAULT_GENRE];

      return updatedGenres;
    });
  };

  const onSubmit = () => {
    const selectedGenresString = selectedGenres.join(",");
    handleGenreChange(selectedGenresString || DEFAULT_GENRE);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        {selectedCount !== 0 ? (
          <div className="ct-button ct-outline h-[2.375rem] px-[1.25rem] gap-2 selected">
            <Image src={slidersActiveIcon} width={18} height={18} alt="genre" />
            <span className="headline h-4">장르</span>
          </div>
        ) : (
          <div className="ct-button ct-outline h-[2.375rem] px-[1.25rem] gap-2">
            <Image src={slidersIcon} width={18} height={18} alt="genre" />
            <span className="headline h-4">장르</span>
          </div>
        )}
      </DrawerTrigger>

      <DrawerContent className="h-[32rem] bg-grey-900 border-none text-font-dark !rounded-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // 기본 폼 제출 방지
            onSubmit(); // 커스텀 제출 함수 호출
          }}
          className="w-full max-w-xl h-full mx-auto px-[1.25rem] md:px-16 flex flex-col gap-6"
        >
          <DrawerHeader className="!py-0 my-2 relative">
            <DrawerTitle className="text-9 text-center font-semibold">
              장르
            </DrawerTitle>

            <button
              className="absolute top-1/2 right-0 -translate-y-1/2"
              onClick={onClose}
              type="button"
            >
              <Image src={xGrayscaleIcon} width={24} height={24} alt="choice" />
            </button>
          </DrawerHeader>

          <ul className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto">
            {GENRES.map((genre) => (
              <li
                key={genre}
                className={`ct-button ct-outline h-[3.125rem] cursor-pointer ${
                  selectedGenres.includes(genre) ? "selected" : ""
                }`}
              >
                <button
                  className="w-full h-full"
                  onClick={() => handleGenreSelect(genre)}
                  type="button"
                >
                  {t(`genre.${genre}`)}
                </button>
              </li>
            ))}
          </ul>

          <DrawerFooter className="flex flex-row !px-0 py-0 mb-12 h-[3.25rem]">
            <Button
              className="ct-unable w-20 h-full"
              type="button"
              onClick={onReset}
            >
              초기화
            </Button>
            <Button className="ct-fill flex-1 h-full" type="submit">
              {`${selectedCount}건 적용하기`}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
