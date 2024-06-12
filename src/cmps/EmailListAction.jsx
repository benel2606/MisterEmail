import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
export function EmailListAction({ sortBy, setSortBy }) {
  function onSortBy(sort) {
    setSortBy((prevSortBy) => ({
      ...prevSortBy,
      sort,
      direct: !sortBy.direct,
    }))
  }
  return (
    <main className="email-list-action">
      <button onClick={() => onSortBy("date")}>
        Date
        {sortBy.sort === "date" &&
          (sortBy.direct === true ? (
            <TiArrowSortedDown
              size={20}
              className="react-icon before-padding"
            />
          ) : (
            <TiArrowSortedUp size={20} className="react-icon before-padding" />
          ))}
      </button>
      <button onClick={() => onSortBy("read")}>
        Read
        {sortBy.sort === "read" &&
          (sortBy.direct === true ? (
            <TiArrowSortedDown
              size={20}
              className="react-icon before-padding"
            />
          ) : (
            <TiArrowSortedUp size={20} className="react-icon before-padding" />
          ))}
      </button>
      <button onClick={() => onSortBy("starred")}>
        Starred
        {sortBy.sort === "starred" &&
          (sortBy.direct === true ? (
            <TiArrowSortedDown
              size={20}
              className="react-icon before-padding"
            />
          ) : (
            <TiArrowSortedUp size={20} className="react-icon before-padding" />
          ))}
      </button>
    </main>
  )
}
