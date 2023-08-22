import java.util.Random;
import java.util.Scanner;

public class TicTacToe {

    /**
     * @param gameBoard The board that will be used throughout the game.
     * 
     *                  Prints a 3 by 3 game board to play tictac toe on.
     */
    public static void printBoard(char[][] gameBoard) {
        // For each array within the 2-d array (remember each singular array is
        // considered a row)
        for (char[] row : gameBoard) {
            // We want to print each character for that row on one line (print out each
            // column)
            for (char c : row) {
                System.out.print(c);
            }
            // After printing out a single row, we want to start a new line so that we can
            // display the entire board.
            System.out.println();

        }
    }

    public static void makeMove(char[][] gameBoard, int nextMove, boolean playerMove) {
        char playMoveSymbol = ' ';
        if (playerMove) {
            playMoveSymbol = 'X';
        } else {
            playMoveSymbol = 'O';
        }

        switch (nextMove) {
            case 1:
                gameBoard[0][0] = playMoveSymbol;
                break;
            case 2:
                gameBoard[0][2] = playMoveSymbol;
                break;
            case 3:
                gameBoard[0][4] = playMoveSymbol;
                break;
            case 4:
                gameBoard[2][0] = playMoveSymbol;
                break;
            case 5:
                gameBoard[2][2] = playMoveSymbol;
                break;
            case 6:
                gameBoard[2][4] = playMoveSymbol;
                break;
            case 7:
                gameBoard[4][0] = playMoveSymbol;
                break;
            case 8:
                gameBoard[4][2] = playMoveSymbol;
                break;
            case 9:
                gameBoard[4][4] = playMoveSymbol;
                break;
            default:
                break;

        }

    }

    public static void runGame(char[][] gameBoard) {
        while (true) {
            System.out.println("Please choose a number between 1 and 9");
            Scanner scan = new Scanner(System.in);
            int nextMove = scan.nextInt();
            // scan.close();
            makeMove(gameBoard, nextMove, true);
            Random rand = new Random();
            int computerMove = rand.nextInt(9) + 1;
            makeMove(gameBoard, computerMove, false);
            printBoard(gameBoard);
        }
    }



    public static void checkWinner(){
        
    }














    public static void main(String[] args) {

        // The game board will be displayed as a 2-d array, we can use chars as we are
        // only inputting single character digits
        char[][] gameBoard = {
                { ' ', '|', ' ', '|', ' ' },
                { '-', '+', '-', '+', '-' },
                { ' ', '|', ' ', '|', ' ' },
                { '-', '+', '-', '+', '-' },
                { ' ', '|', ' ', '|', ' ' } };

        printBoard(gameBoard);
        runGame(gameBoard);
    }

}
