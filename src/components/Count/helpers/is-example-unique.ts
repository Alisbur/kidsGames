import { TExample } from "../types/example.type";

export const isExampleUnique = (examples: TExample[], newExample: TExample): boolean => {
  if(!examples.length) return true;

  for(const ex of examples) {
    if(ex.firstItem === newExample.firstItem && ex.secondItem === newExample.secondItem && ex.type === newExample.type) {
      return false;
    }
  }

  return true;
}