import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useCreateWordData } from "../../hooks/api/my_word/my_word";


type AddCardProps = {
  productId: number;
  };
  
  
 export const AddCard = ({ productId }: AddCardProps) => {
    const [wordText, setWordText] = useState("");
    const [definition, setDefinition] = useState("");
    const [adding, setAdding] = useState(false);
    const createWord = useCreateWordData();
   

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!wordText.trim().length || !definition.trim().length) return;
  
      await createWord({productId, wordText, definition});
      setAdding(false);
    };


    return (
      <>
        {adding ? (
          <motion.form layout onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setWordText(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
              <textarea
              onChange={(e) => setDefinition(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />

            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add</span>
                <FiPlus />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.button
            layout
            onClick={() => setAdding(true)}
            className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
          >
            <span>Add card</span>
            <FiPlus />
          </motion.button>
        )}
      </>
    );
  };
  
