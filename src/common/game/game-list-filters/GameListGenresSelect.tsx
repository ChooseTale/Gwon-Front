"use client";
import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";
import { type GameInfo } from "@/interface/customType";
import GenresSelect from "@/app/(game)/game/[gameId]/confirm/_components/form/GenresSelect";

interface GameListSelectProps {
  searchParams: FormattedSearchParams;
}

export default function GameListGenresSelect({
  searchParams,
}: GameListSelectProps) {
  const router = useRouter();
  const params = useSearchParams();

  const defaultValues = { genre: searchParams.genre };
  const { control } = useForm<Partial<GameInfo>>({
    defaultValues,
  });
  const genre = useWatch({ control, name: "genre" });

  const handleFilterChange = useCallback(
    (newGenre: string) => {
      const updatedParams = new URLSearchParams(params);
      updatedParams.set("genre", newGenre);

      router.push(`?${updatedParams.toString()}`);
    },
    [router, params]
  );

  useEffect(() => {
    if (genre) {
      handleFilterChange(genre);
    }
  }, [genre, handleFilterChange]);

  const genreId = "genresSelect";

  return (
    <>
      <label htmlFor={genreId}>장르</label>
      <GenresSelect
        id={genreId}
        name="genre"
        labelText=""
        control={control}
        hasSelectAll
      />
    </>
  );
}
