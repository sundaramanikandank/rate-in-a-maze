import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'rat-in-a-maze';
  maze =
    [[ 1, 0, 1, 1 ],
    [ 1, 1, 0, 1 ],
    [ 0, 1, 1, 1 ],
    [ 1, 1, 1, 1 ] ];

  mazeLength = this.maze.length;
  public inputMatrix = Array(this.mazeLength).fill(0).map((x,i)=>i);
  public isSolutionExist: boolean = false;
  public solutionMatrix = new Array(this.mazeLength);

  public ngOnInit(): void {
    this.solveMaze(this.maze);
  }

  public solveMaze(maze:any): void {
    let sol = this.solutionMatrix;
    for(let i=0;i<this.mazeLength;i++)
    {
      sol[i]=new Array(this.mazeLength);
      for(let j=0;j<this.mazeLength;j++)
      {
        sol[i][j]=0;
      }
    }
    this.isSolutionExist = this.solveMazeUtil(maze, 0, 0, sol);
  }

  public solveMazeUtil(maze:any,x:number,y:number,sol:any): boolean
  {
    if (x === this.mazeLength - 1 && y === this.mazeLength - 1 && maze[x][y] === 1) {
      sol[x][y] = 1;
      return true;
    }

    // Check if maze[x][y] is valid
    if (this.isSafe(maze, x, y)) {
      // Check if the current block is already part of solution path.
      if (sol[x][y] === 1)
        return false;

      // mark x, y as part of solution path
      sol[x][y] = 1;

      /* Move forward in x direction */
      if (this.solveMazeUtil(maze, x + 1, y, sol))
        return true;

      /* If moving in x direction doesn't give
      solution then Move down in y direction */
      if (this.solveMazeUtil(maze, x, y + 1, sol))
        return true;

      /* If moving in y direction doesn't give
      solution then Move backwards in x direction */
      if (this.solveMazeUtil(maze, x - 1, y, sol))
        return true;

      /* If moving backwards in x direction doesn't give
      solution then Move upwards in y direction */
      if (this.solveMazeUtil(maze, x, y - 1, sol))
        return true;

      /* If none of the above movements works then
      BACKTRACK: unmark x, y as part of solution
      path */
      sol[x][y] = 0;
      return false;
    }

    return false;
  }

  private isSafe(maze: any, x: any, y: any): boolean {
    // if (x, y outside maze) return false
    return (x >= 0 && x < this.mazeLength && y >= 0
      && y < this.mazeLength && maze[x][y] === 1);
  }

  private printSolution(sol: any) {

  }
}
