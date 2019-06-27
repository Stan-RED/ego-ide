export interface ITranslationService {
  // e.g., scope.add => add.
  get(fqn: string): string;
}

// WORK: Use me!
export class TranslationService implements ITranslationService {
  get(fqn: string): string {
    return fqn.substr(fqn.lastIndexOf(".") + 1);
  }
}

const translationService = new TranslationService();
export default translationService;
