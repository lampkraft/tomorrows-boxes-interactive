import { IDrawable } from "./Drawable.interface";
import { IUpdatable } from "./Updatable.interface";

export interface ICanvasCharacter extends IUpdatable, IDrawable {
	id: string;
}