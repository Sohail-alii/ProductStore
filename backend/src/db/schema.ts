import { pgTable, PgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow(),
    // updatedAt: timestamp("updated_at", {mode: "date"}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", {mode: "date"})
    .notNull()
    .defaultNow()
    .$onUpdate(()  => new Date())
});

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade"}) // when delete user delete user product
})

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade"}), // when delete user delete user product
    productsId: text("product_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade"})
})

// user relation

export const usersRelations = relations(users, ({many}) => ({
    products: many(products), // one user many products
    comments: many(comments) // one user many comments
}))

// products relation

export const productsRelations = relations(products, ({one, many}) => ({
    comments: many(comments), // one  many comments
    users: one(users, {fields:[products.userId], references: [users.id]})
}))

// comments relation

export const commentsRelations = relations(comments, ({one}) => ({
    products: one(products, {fields: [comments.userId], references: [products.id]}), 
    users: one(users, {fields:[comments.userId], references: [users.id]}),
}))

// type inference

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
