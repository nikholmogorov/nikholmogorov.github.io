import { USERS } from "@/constants";

import type { CardProps } from "@/types";

export function Card(props: CardProps) {
  const { post, onClick } = props;
  const { userId, id, title, body } = post;

  return (
    <button
      className="w-[37.5rem] max-[501px]:w-[22.5rem] max-[361px]:w-[20rem] text-left select-text"
      onClick={onClick}
      type="button"
    >
      <div>
        <span>#{id}</span>
        <span className="ml-2.5">{USERS[userId]}</span>
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="line-clamp-2">{body}</p>
    </button>
  );
}
