import { Router, Response, Request } from "express";
import { PostEntity, PostEntity2 } from "../database/entities/post.entity";
import { PostService } from "../services/post.service"; // import service
import util from 'util';

export class PostController {
  public router: Router;
  private postService: PostService;

  constructor() {
    this.postService = new PostService(); // Create a new instance of PostController
    this.router = Router();
    this.routes();
    console.log("console constructor enter");
  }


  private makeConfigInput(x: any, y: any) {
    console.log(`make config: ${JSON.stringify(x)}`)
    return `<html>
    <body>
    <h1>SLVT Pool rebalance config options</h1>   
    <form method="post" action="/api/posts">
    <label for="buyPrct">Target Buy Prct:</label>
    <input type="text" id="buyPrct" name="target_buy_prct" value=${x.target_buy_prct}><br><br>

    <label for="sellPrct">Target Sell Prct:</label>
    <input type="text" id="sellPrct" name="target_sell_prct" value=${x.target_sell_prct}><br><br>

    <label for="sleepTime">Min Mill Sec Between Trades:</label>
    <input type="text" id="sleepTime" name="min_mill_sec_between_trades" value=${x.min_mill_sec_between_trades}><br><br>

    <label for="sleepTime">Sleep Time Mill Sec:</label>
    <input type="text" id="sleepTime" name="sleep_time_mill_sec" value=${x.sleep_time_mill_sec}><br><br>

    <label for="maxNumErrors">Max Num Errors:</label>
    <input type="text" id="maxNumErrors" name="max_num_errors" value=${x.max_num_errors}><br><br>

    <label for="maxNumTrades">Max Num Trades:</label>
    <input type="text" id="maxNumTrades" name="max_num_trades" value=${x.max_num_trades}><br><br>
    
    <label for="doMakeTrades">Do Make Trades:</label>
    <input type="text" id="doMakeTrades" name="do_make_trades" value=${x.do_make_trades}><br><br>
    
    <label for="slvtBuyAmount">SLVT Buy Amounts:</label>
    <input type="text" id="slvtBuyAmount" name="slvt_buy_amount" value=${x.slvt_buy_amount}><br><br>
    
    <label for="slvtSellAmount">SLVT Sell Amounts:</label>
    <input type="text" id="slvtSellAmount" name="slvt_sell_amount" value=${x.slvt_sell_amount}><br><br>
    
    <input type="submit" value="Submit"><br><br>

    Pool Price: ${y.pool_price}<br>
    Silver Price: ${y.silver_price} <br>
    Last Evaluation Time: ${y.last_evaluation_time}<br>
    </form>    
    </body>
    </html>    
    `;
  }

  public index = async (req: any, res: Response) => {
    try {
      if(!req.session.loggedIn){
        res.send("Please login first");
        return;
      }

      console.log(`$session from index ${JSON.stringify(req.session)}`);
      const posts = await this.postService.index();
      
      const posts2 = await this.postService.index2();
      if (posts2 && posts2.length) {
        res.send(this.makeConfigInput(posts2[0], posts[0]));
      }
      
    } catch (e) {
      console.log(`errro ${e}`)

    }
  }

  public create = async (req: Request, res: Response) => {
  
    
  }

  public update = async (req: any, res: Response) => {
    if(!req.session.loggedIn){
      res.send("Please login first");
      return;
    }

    console.log("update");
    
    const post = req['body'] as PostEntity2;
    const id = 1;
    await this.postService.update(post, Number(id));
    const posts2 = await this.postService.index2();
    const posts = await this.postService.index();
    if (posts2 && posts2.length) {
      res.send(this.makeConfigInput(posts2[0], posts[0]));
    }
  }

  public delete = async (req: Request, res: Response) => {
    //const id = req['params']['id'];
   // res.send(this.postService.delete(Number(id)));
  }

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.get('/', this.index);
    this.router.post('/', this.update);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}