import { Request, Response } from 'express';
import { User } from '../db/models/User/User';
import { ValidationError as SequelizeValidationError, Op} from 'sequelize';

const signUp = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body); // field
        res.status(200)
            .json({
                message: "sign up successful",
            })
    } catch (error: unknown) {
        if (error instanceof SequelizeValidationError) {
            res.json(error.errors[0])
        } else {
            res.json(error);
        }
    }
}

const getAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if(id) {
            const result = await User.findByPk(id);
            if (result) {
                res.json(result);
            } else {
                res.json({
                    message: `id is out of bond`
                })
            }
        } else {
            const result = await User.findAll();
            if (result) {
                res.json(result);
            } else {
                res.json({
                    message: `something went wrong`
                })
            }
        }
    } catch (error) {
        if (error instanceof SequelizeValidationError) {
            res.json(error.errors[0])
        } else {
            res.json(error);
        }
    }
}

const signIn = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const result = await User.findAll({
            where: {
                [Op.and]: [
                        { username: `${username}` },
                        { password: `${password}` }
                ]
            }
        })
        if (result.length > 0) {
            res.status(200)
                .json({
                    message: "logged in",
                })
        } else {
            res.status(404)
                .json({
                    message: "username or password is incorrect"
                })
        }
    } catch (error: unknown) {
        if (error instanceof SequelizeValidationError) {
            res.json(error.errors[0])
        } else {
            res.json(error);
        }
    }
}

const editAccount = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const dataList = ["username", "password", "name", "img", "email", "isPublisher"]
        const updateData: { [key in typeof dataList[number]]?: any } = {};
        let value: keyof typeof dataList
        dataList.forEach((key) => {
            if (req.body[key] !== undefined) {
                updateData[key] = req.body[key];
            }
        })
        const result = await User.update(updateData, {
            where: {
                userId: id
            }
        })
        if (result[0] > 0) {
            res.json({
                message: "account updated"
            })
        } else {
            res.send("something went wrong")
        }
    } catch (error: unknown) {
        if (error instanceof SequelizeValidationError) {
            res.json(error.errors['0'])
        } else {
            res.json(error)
        }
    }
}

const deleteAccount = async (req: Request, res: Response) => {
    try { 
        const {id} = req.params;
        const result = await User.destroy({
            where: {
                userId: id
            },
        })
        if (result > 0) {
            res.json({
                message: "account deleted"
            })
        } else {
            res.send("id is out of bond")
        }
    } catch (error) {
        if (error instanceof SequelizeValidationError) {
            res.json(error.errors['0'])
        } else {
            res.json(error)
        }
    }
}

export { signUp, getAccount, signIn, editAccount, deleteAccount };

// dont forget to fix res msg and status code