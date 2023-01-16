/** @jsxImportSource theme-ui */

import "./DropdownStyle.css";

const DropdownNavbar = ({ submenu, title }) => {
  return (
    <div
      className="dropdown"
    >
      <button
        className="dropbtn"
        sx={{
          color: "inherit",
          ":hover": {
            color: "colorblue"
          }
        }}
      >
        {title}
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content" sx={{ background: "background" }}>
        {submenu.map((item) => {
          return (
            <a
              href={item.url}
              key={item.id}
              sx={{
                color: "inherit",
                ":focus": {
                  outline: "2px solid #6BA1D9",
                },
                ":hover": {
                  background: "colorblue"
                },
              }}
            >
              {item.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownNavbar;
