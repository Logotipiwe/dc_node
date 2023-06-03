export default abstract class AbstractConsoleController {
    abstract processConsole(args: string[]): Promise<string>;
}