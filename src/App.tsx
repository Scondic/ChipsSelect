import { useEffect, useState } from "react";

import { ChipsSelect } from "@/components";

const App = () => {
  const [language, setLanguage] = useState([
    { id: 1, option: "Английский", description: "English" },
    { id: 2, option: "Русский", description: "Русский" },
    { id: 3, option: "Немецкий", description: "Deutsch" },
    { id: 4, option: "Французский", description: "Français" },
    { id: 5, option: "Японский", description: "日本" },
  ]);
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
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  return (
    <div className={"Content"}>
      <ChipsSelect {...languageChipsProps} />
      <ChipsSelect {...userChipsProps} />
    </div>
  );
};

export default App;
