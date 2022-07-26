import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";

type QuestionsContextType = {
  data: {
    id: string,
    lesson: string[],
    question: string,
    answers: string[]
  }[],
  setData: Dispatch<SetStateAction<Array<object>>>;
  variables: {
    key: string,
    value: string
  }[],
  setVariables: Dispatch<SetStateAction<Array<object>>>;
  columns: {
    [key: string]: any
  }[]
};

export const QuestionsContext = createContext<QuestionsContextType>({
  data: [],
  setData: () => null,
  variables: [],
  setVariables: () => null,
  columns: []
});

type QuestionsProviderProps = {
  children: ReactNode;
};

export const QuestionsProvider: FC<QuestionsProviderProps> = (props) => {
  const { children } = props;

  const [data, setData] = useState([
    {
      id: "1",
      lesson: ["Lesson 1"],
      question: "Question 1",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "2",
      lesson: ["Lesson 1"],
      question: "Question 2",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "3",
      lesson: ["Lesson 1"],
      question: "Question 3",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "4",
      lesson: ["Lesson 1"],
      question: "Question 4",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "5",
      lesson: ["Lesson 1"],
      question: "Question 5",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "6",
      lesson: ["Lesson 1"],
      question: "Question 6",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "7",
      lesson: ["Lesson 1"],
      question: "Question 7",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "8",
      lesson: ["Lesson 1"],
      question: "Question 8",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "9",
      lesson: ["Lesson 1"],
      question: "Question 9",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "10",
      lesson: ["Lesson 1"],
      question: "Question 10",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "11",
      lesson: ["Lesson 1"],
      question: "Question 11",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "12",
      lesson: ["Lesson 1"],
      question: "Question 12",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "13",
      lesson: ["Lesson 1"],
      question: "Question 13",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "14",
      lesson: ["Lesson 1"],
      question: "Question 14",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "15",
      lesson: ["Lesson 1"],
      question: "Question 15",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "16",
      lesson: ["Lesson 1"],
      question: "Question 16",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "17",
      lesson: ["Lesson 1"],
      question: "Question 17",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "18",
      lesson: ["Lesson 1"],
      question: "Question 18",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "19",
      lesson: ["Lesson 1"],
      question: "Question 19",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
    {
      id: "20",
      lesson: ["Lesson 1"],
      question: "Question 20",
      answers: [
        "My name is Oğuzhan",
        "My name is Ahmet"
      ]
    },
  ]);

  const [variables, setVariables] = useState([
    { key: "Key", value: "Value" }
  ])

  const [columns] = useState([
    { id: "id", name: "Id", width: 80 },
    { id: "lesson", name: "Lessons", width: 100 },
    { id: "question", name: "Questions", width: 180 },
    { id: "answers", name: "Answers", flexGrow: 1 },
    { id: "actions", name: "Edit", fixed: "right", width: 80 }
  ]);

  const value: any = useMemo(
    () => ({
      data,
      setData,
      variables,
      setVariables,
      columns
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, variables]
  );

  return (
    <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>
  );
};
