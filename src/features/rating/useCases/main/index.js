import Search from "../search";
import Rate from "../rate";
import CannotRate from "../cannotRate";

import useRating from "./service"

export default function Main() {
  const {
    handleChange,
    balance,
    setValue,
    goToRate,
    value
  } = useRating();

  if (value === "1")
    return (<Rate handleSwitch={handleChange} value={value} goToRate={goToRate} />);
  else if (value === "3")
    return (<CannotRate setValue={setValue} />);
  else
    return (<Search handleSwitch={handleChange} value={value} balance={balance} />);
}