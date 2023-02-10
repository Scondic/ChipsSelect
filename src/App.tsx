import { useEffect, useState } from "react";

import { ChipsSelect } from "@/components";

const App = () => {
  const [language, setLanguage] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const languageChipsProps = {
    selected: selectedLanguage,
    setSelected: setSelectedLanguage,
    options: language,
    setOptions: setLanguage,
    placeholder: "Введите язык",
  };

  const userChipsProps = {
    sort: "username",
    selected: selectedUsers,
    setSelected: setSelectedUsers,
    options: users,
    setOptions: setUsers,
    placeholder: "Введите имя игрока",
  };

  useEffect(() => {
    fetch("https://63e638c57eef5b2233814dc7.mockapi.io/lang")
      .then((response) => response.json())
      .then((json) => setLanguage(json));
  }, []);

  return (
    <div className={"Content"}>
      <ChipsSelect {...languageChipsProps} />
      <ChipsSelect {...userChipsProps} />
    </div>
  );
};

export default App;
