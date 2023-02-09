import { useEffect, useState } from "react";

import { ChipsSelect } from "@/components";

const App = () => {
  const [language, setLanguage] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);

  const languageChipsProps = {
    value: selectedLanguage,
    onChange: setSelectedLanguage,
    options: language,
    setOptions: setLanguage,
    placeholder: "Введите язык",
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setLanguage(json));
  }, []);

  return (
    <div className={"Content"}>
      <ChipsSelect {...languageChipsProps} />
    </div>
  );
};

export default App;
