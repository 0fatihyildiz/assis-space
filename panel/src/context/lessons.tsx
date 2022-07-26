import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";

type LessonsContextType = {
  lessons: {
    id: string,
    label: string,
    value: string,
    randomize: boolean,
    variables: {
      key: string,
      value: string
    }[],
    private: boolean,
    questions: string[]
  }[],
  setLessons: Dispatch<SetStateAction<Array<object>>>;
  columns: {
    [key: string]: any
  }[]
};

export const LessonsContext = createContext<LessonsContextType>({
  lessons: [],
  setLessons: () => null,
  columns: []
});

type LessonsProviderProps = {
  children: ReactNode;
};

export const LessonsProvider: FC<LessonsProviderProps> = (props) => {
  const { children } = props;

  const [lessons, setLessons] = useState([
    {
      id: "1",
      name: "Lesson 1",
      randomize: true,
      variables: [
        {
          key: "Key-1",
          value: "Value-1"
        },
        {
          key: "Key-2",
          value: "Value-2"
        }
      ],
      private: false,
      questions: ["Question 1"]
    },
    {
      id: "2",
      name: "Lesson 2",
      randomize: true,
      variables: [
        {
          key: "Key-1",
          value: "Value-1"
        },
        {
          key: "Key-2",
          value: "Value-2"
        }
      ],
      private: false,
      questions: ["Question 1"]
    },
    {
      id: "3",
      name: "Lesson 3",
      randomize: true,
      variables: [
        {
          key: "Key-1",
          value: "Value-1"
        },
        {
          key: "Key-2",
          value: "Value-2"
        }
      ],
      private: false,
      questions: ["Question 1"]
    },
    {
      id: "4",
      name: "Lesson 4",
      randomize: true,
      variables: [
        {
          key: "Key-1",
          value: "Value-1"
        },
        {
          key: "Key-2",
          value: "Value-2"
        }
      ],
      private: false,
      questions: ["Question 1"]
    },
  ]);

  const [columns] = useState([
    { id: "id", name: "Id", width: 80, },
    { id: "name", name: "Lesson Name", width: 120 },
    { id: "randomize", name: "Randomize", align: "center", width: 80 },
    { id: "variables", name: "Variables", width: 180 },
    { id: "private", name: "Private", width: 80 },
    { id: "questions", name: "Questions", minWidth: 120, flexGrow: 1 },
    { id: "actions", name: "Edit", fixed: "right", width: 80 }
  ])

  const value: any = useMemo(
    () => ({
      lessons,
      setLessons,
      columns
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lessons]
  );

  return (
    <LessonsContext.Provider value={value}>{children}</LessonsContext.Provider>
  );
};
