import { useState, useEffect, useRef } from "react";
import axiosFetch from "@/Utils/fetchBackend";
import styles from "@/styles/Search.module.scss";
import ReactPaginate from "react-paginate"; // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import MovieCardLarge from "@/components/MovieCardLarge";
import Skeleton from "react-loading-skeleton";
import NProgress from "nprogress";

const dummyList = Array.from({ length: 10 }, (_, i) => i + 1); // Creates an array [1, 2, ..., 10]

interface Genre {
  id: number;
  name: string;
}

interface MovieData {
  results: any[];
  total_pages: number;
  page: number;
}

interface SearchPageProps {
  categoryType: string;
}

const SearchPage = ({ categoryType }: SearchPageProps) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [genreListMovie, setGenreListMovie] = useState<Genre[]>([]);
  const [genreListTv, setGenreListTv] = useState<Genre[]>([]);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const searchBar = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const gM = await axiosFetch({ requestID: "genresMovie" });
        const gT = await axiosFetch({ requestID: "genresTv" });
        setGenreListMovie(gM.genres);
        setGenreListTv(gT.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
    searchBar.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        searchBar.current?.focus();
      } else if (event.key === "Escape") {
        event.preventDefault();
        searchBar.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const debounceFetchData = (mode: boolean) => {
      const fetchData = async () => {
        setLoading(true);
        try {
          let data: MovieData;

          if (mode) {
            data = await axiosFetch({
              requestID: "searchMulti",
              page: currentPage,
              query: query,
            });

            if (data.page > data.total_pages) {
              setCurrentPage(data.total_pages);
            }

            setTotalPages(Math.min(data.total_pages, 500));
          } else {
            data = await axiosFetch({ requestID: "trending" });
            setCurrentPage(1);
            setTotalPages(1);
          }

          setData(data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      if (query.length >= 3) {
        fetchData();
      } else if (query.length === 0) {
        fetchData();
      }
    };

    const debounceTimer = setTimeout(() => {
      debounceFetchData(query.length > 2);
    }, 600);

    return () => clearTimeout(debounceTimer);
  }, [query, currentPage]);

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

    useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <div className={styles.MoviePage}>
      <div className={styles.logo}>
        <img src="/images/63d168593f214df1ae64b04babe19c89-free.png" alt="Noir+ Logo" className={styles.logoImage} />
        <h1 className={styles.logoText}>Noir+</h1>
      </div>
      <div className={styles.InputWrapper}>
        <input
          ref={searchBar}
          type="text"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Please enter at least 3 characters to search..."
          onFocus={() => setIsSearchBarFocused(true)}
          onBlur={() => setIsSearchBarFocused(false)}
        />
        <div className={styles.inputShortcut}>
          {!isSearchBarFocused ? (
            <span className="tooltip-btn">/</span>
          ) : (
            <span className="tooltip-btn">Esc</span>
          )}
        </div>
      </div>
      {query.length > 2 ? (
        <h1>
          Showing results for <span className={styles.serachQuery}>{query}</span>
        </h1>
      ) : (
        <h1>
          Top Searches <span className={styles.serachQuery}>today</span>
        </h1>
      )}
      <div className={styles.movieList}>
        {genreListMovie.length > 0 && genreListTv.length > 0 && data.map((ele) => (
          <MovieCardLarge
            key={ele.id} // Ensure to add a unique key for each element
            data={ele}
            media_type={categoryType}
            genresMovie={genreListMovie}
            genresTv={genreListTv}
          />
        ))}
        {query.length > 2 && data.length === 0 ? (
          <h1>No Data Found</h1>
        ) : null}
        {query.length > 2 && data === undefined ? (
          dummyList.map((ele) => <Skeleton key={ele} className={styles.loading} />)
        ) : null}
        {genreListMovie.length === 0 || genreListTv.length === 0 ? (
          dummyList.map((ele) => (
            <MovieCardLarge
              key={ele} // Ensure to add a unique key for each element
              data={ele}
              media_type={categoryType}
              genresMovie={genreListMovie}
              genresTv={genreListTv}
            />
          ))
        ) : null}
      </div>
      <ReactPaginate
        containerClassName={styles.pagination}
        pageClassName={styles.page_item}
        activeClassName={styles.paginateActive}
        onPageChange={(event) => {
          setCurrentPage(event.selected + 1);
          if (currentPage > totalPages) {
            setCurrentPage(totalPages);
          }
          window.scrollTo(0, 0);
        }}
        forcePage={currentPage - 1}
        pageCount={totalPages}
        breakLabel=" ... "
        previousLabel={<AiFillLeftCircle className={styles.paginationIcons} />}
        nextLabel={<AiFillRightCircle className={styles.paginationIcons} />}
      />
    </div>
  );
};

export default SearchPage;
